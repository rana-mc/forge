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

type ForgeServerData = {
  id: string;
  name: string;
  status: string;
  core: ForgeServerCore;
  mods: string[];
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
