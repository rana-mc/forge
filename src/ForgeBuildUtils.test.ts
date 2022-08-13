import { ForgeBuildUtils } from "./ForgeBuildUtils";

const forgeBuildUtils = new ForgeBuildUtils();

test("getCores works and contains at least 3 core", async () => {
  const cores = await forgeBuildUtils.getCores("1.19.1");
  expect(cores).toEqual(
    expect.arrayContaining([
      {
        gameVersion: "1.19.1",
        coreVersion: "42.0.2",
        uploadTime: "2022-08-03 21:51:14",
        installerUrl:
          "https://adfoc.us/serve/sitelinks/?id=271228&url=https://maven.minecraftforge.net/net/minecraftforge/forge/1.19.1-42.0.2/forge-1.19.1-42.0.2-installer.jar",
        changelogUrl:
          "https://maven.minecraftforge.net/net/minecraftforge/forge/1.19.1-42.0.2/forge-1.19.1-42.0.2-changelog.txt",
        mdkUrl:
          "https://adfoc.us/serve/sitelinks/?id=271228&url=https://maven.minecraftforge.net/net/minecraftforge/forge/1.19.1-42.0.2/forge-1.19.1-42.0.2-mdk.zip",
      },
      {
        gameVersion: "1.19.1",
        coreVersion: "42.0.1",
        uploadTime: "2022-07-29 08:30:15",
        installerUrl:
          "https://adfoc.us/serve/sitelinks/?id=271228&url=https://maven.minecraftforge.net/net/minecraftforge/forge/1.19.1-42.0.1/forge-1.19.1-42.0.1-installer.jar",
        changelogUrl:
          "https://maven.minecraftforge.net/net/minecraftforge/forge/1.19.1-42.0.1/forge-1.19.1-42.0.1-changelog.txt",
        mdkUrl:
          "https://adfoc.us/serve/sitelinks/?id=271228&url=https://maven.minecraftforge.net/net/minecraftforge/forge/1.19.1-42.0.1/forge-1.19.1-42.0.1-mdk.zip",
      },
      {
        gameVersion: "1.19.1",
        coreVersion: "42.0.0",
        uploadTime: "2022-07-28 06:02:05",
        installerUrl:
          "https://adfoc.us/serve/sitelinks/?id=271228&url=https://maven.minecraftforge.net/net/minecraftforge/forge/1.19.1-42.0.0/forge-1.19.1-42.0.0-installer.jar",
        changelogUrl:
          "https://maven.minecraftforge.net/net/minecraftforge/forge/1.19.1-42.0.0/forge-1.19.1-42.0.0-changelog.txt",
        mdkUrl:
          "https://adfoc.us/serve/sitelinks/?id=271228&url=https://maven.minecraftforge.net/net/minecraftforge/forge/1.19.1-42.0.0/forge-1.19.1-42.0.0-mdk.zip",
      },
    ])
  );
});

test("buildCore return correct core", async () => {
  const core = await forgeBuildUtils.buildCore("1.19.1", "42.0.2");
  expect(core).toEqual({
    type: "forge",
    gameVersion: "1.19.1",
    coreVersion: "42.0.2",
    uploadTime: "2022-08-03 21:51:14",
    installerUrl:
      "https://adfoc.us/serve/sitelinks/?id=271228&url=https://maven.minecraftforge.net/net/minecraftforge/forge/1.19.1-42.0.2/forge-1.19.1-42.0.2-installer.jar",
    changelogUrl:
      "https://maven.minecraftforge.net/net/minecraftforge/forge/1.19.1-42.0.2/forge-1.19.1-42.0.2-changelog.txt",
    mdkUrl:
      "https://adfoc.us/serve/sitelinks/?id=271228&url=https://maven.minecraftforge.net/net/minecraftforge/forge/1.19.1-42.0.2/forge-1.19.1-42.0.2-mdk.zip",
  });
});
