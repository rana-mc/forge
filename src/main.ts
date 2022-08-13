#!/usr/bin/env node --experimental-specifier-resolution=node
/// <reference path="./types/index.d.ts" />

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { ForgeBuildUtils } from "./ForgeBuildUtils";

const forgeBuildUtils = new ForgeBuildUtils();

yargs(hideBin(process.argv))
  .command(
    "cores [gameVersion]",
    "list of cores",
    (yargs) => {
      return yargs.positional("gameVersion", {
        describe: "version of minecraft",
        default: "1.19.1",
      });
    },
    async (argv) => {
      const cores = await forgeBuildUtils.getCores(argv.gameVersion);
      console.log(cores);
    }
  )
  .command(
    "show [gameVersion] [coreVersion]",
    "show core as server core",
    (yargs) => {
      return yargs
        .positional("gameVersion", {
          describe: "version of minecraft",
          default: "1.19.1",
        })
        .positional("coreVersion", {
          describe: "version of forge",
          default: "42.0.9",
        });
    },
    async (argv) => {
      await forgeBuildUtils.getCores(argv.gameVersion);
      const core = await forgeBuildUtils.buildCore(
        argv.gameVersion,
        argv.coreVersion
      );
      console.log(core);
    }
  )
  .parse();

export * from "./ForgeServer";
export * from "./ForgeBuildUtils";
