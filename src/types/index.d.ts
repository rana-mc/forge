type ForgeCore = {
  gameVersion: string;
  coreVersion: string;
  uploadTime: string;
  changelogUrl: string | null;
  installerUrl: string | null;
  mdkUrl: string | null;
};

type ExternalForgeCoreUrl = {
  url: string;
  name: string;
};

type ServerMod = string;

type Server<T = ForgeCore> = {
  id: string;
  name: string;
  status: string;
  core: T;
  mods: ServerMod[];
  gameVersion: string;
  gameVersionTypeId: number;
  eula: boolean;
  startTimes: [];
};

type ForgeServerCore = { type: "forge" } & ForgeCore;

type ForgeLocalDBData = {
  cores: {
    [version: string]: ForgeCore[];
  };
};
