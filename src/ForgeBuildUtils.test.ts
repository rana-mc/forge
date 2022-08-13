import { ForgeBuildUtils } from "./ForgeBuildUtils";

const forgeBuildUtils = new ForgeBuildUtils();

test("getCores returns correct cores", async () => {
  const cores = await forgeBuildUtils.getCores("1.19.1");
  console.log(cores);
  //   expect(sum(1, 2)).toBe(3);
});
