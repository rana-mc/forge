import { ChildProcess } from 'child_process';
import EventEmitter from 'events';
import { Logger } from './Logger';
import ServerWorkspace from './ServerWorkspace';

// TODO: Move in another file
export enum ServerEvents {
  CoreInstalling = 'coreInstalling',
  CoreInstalled = 'coreInstalled',
  Starting = 'starting',
  Started = 'started',
  Stopping = 'stopping',
  Stopped = 'stopped',
  // TODO: Use when got crash in console output.
  Crashed = 'crashed',
  Logs = 'logs',
  EulaChanged = 'eulaChanged',
  StartTime = 'startTime',
  Removing = 'removing',
  Removed = 'removed',
}

export class ForgeServer extends EventEmitter {
  public static TAG = 'ForgeServer';

  private logger: Logger;

  private server: ForgeServerData;

  private process: ChildProcess;

  private workspace: ServerWorkspace;

  constructor(server: ForgeServerData) {
    super();

    this.server = server;
    this.workspace = new ServerWorkspace(server);
    this.logger = new Logger(this.getTag());
  }

  public get id() {
    return this.server.id;
  }

  /**
   * Install server core.
   * Got three steps: download installer, exec, remove it and logs.
   * Maybe in future: arg for saving logs after install.
   */
  public async installCore() {
    this.emit(ServerEvents.CoreInstalling);

    const installer = this.workspace.getInstaller();
    this.logger.log(`Installing: ${installer.filename}`);

    await installer.download();
    this.logger.log('Downloading...');

    const { command } = installer;
    this.logger.log(`Install with: ${command}`);

    const process = installer.exec();

    process.stdout.on('data', (message) => {
      this.logger.log(`(ServerEvent): name = ${ServerEvents.Logs}, message = ${message}`);
      this.emit(ServerEvents.Logs, message);
    });

    process.on('exit', () => {
      this.logger.log(`(ServerEvent): name = ${ServerEvents.CoreInstalled}`);
      this.emit(ServerEvents.CoreInstalled);
      installer.clear();
    });
  }

  /**
   * Start server with core.
   */
  public async start() {
    this.emit(ServerEvents.Starting);

    const core = this.workspace.getCore();
    this.logger.log(`Starting...: ${core.filename}`);

    const { command } = core;
    this.logger.log(`Start with: ${command}`);

    const process = core.exec();
    this.process = process;

    /** Little bit incorrect method to parse server start event. */
    process.stdout.on('data', (message) => {
      if (this.isServerStartedMessage(message)) {
        this.emit(ServerEvents.Started);
        this.emit(ServerEvents.StartTime, this.parseServerStartTime(message));
      }
    });

    process.stdout.on('data', (message) => {
      this.logger.log(`(ServerEvent): name = ${ServerEvents.Logs}, message = ${message}`);
      this.emit(ServerEvents.Logs, message);
    });

    process.on('exit', () => {
      this.logger.log(`(ServerEvent): name = ${ServerEvents.Stopped}`);
      this.emit(ServerEvents.Stopped);
    });
  }

  /**
   * Exec command on server.
   */
  public exec(command: string) {
    this.process.stdin.write(`${command}\n`);
    this.process.stdout.pipe(process.stdout);

    // TODO: Maybe event for command execution?
  }

  /**
   * Stop server.
   */
  public stop() {
    this.emit(ServerEvents.Stopping);

    this.process.stdin.write('stop\n');
    this.process.stdout.pipe(process.stdout);

    // TODO: Maybe event for stop server command execution?
  }

  /**
   * Remove server core.
   */
  public async removeCore() {
    const core = this.workspace.getCore();

    this.logger.log(`Removing...: ${core.filename}`);
    await core.clear();
  }

  /**
   * Remove server folder.
   */
  public async remove() {
    this.emit(ServerEvents.Removing);

    await this.workspace.clear();
    this.emit(ServerEvents.Removed);
  }

  /**
   * Update server data.
   */
  public update(server: ForgeServerData): ForgeServer {
    this.server = server;
    return this;
  }

  /**
   * Accepting or not of Mojang EULA.
   * Just replacing eula=accept_value in eula.txt.
   */
  public async acceptEULA(accept: boolean) {
    this.logger.log(`Accepting EULA...: ${accept}`);
    this.emit(ServerEvents.EulaChanged, accept);

    return this.workspace.acceptEULA(accept);
  }

  /**
   * Return all of ServerEvents values.
   */
  public eventNames(): (string | symbol)[] {
    return Object.values(ServerEvents);
  }

  /**
   * Return tag for logger. Like ForgeServer-123;
   */
  public getTag() {
    return `${ForgeServer.TAG}-${this.id}`;
  }

  /**
   * Well, just parse server starting event;
   */
  private isServerStartedMessage(message: string): boolean {
    return message.includes('For help, type "help"');
  }

  /**
   * Parse with regular server start time.
   */
  private parseServerStartTime(message: string): number {
    try {
      const startTime = message.match(/Done \((.+)s\)! For help, type "help"/);
      return parseFloat(startTime[1]);
    } catch (err) {
      return 0;
    }
  }
}
