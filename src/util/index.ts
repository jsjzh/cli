import type { StdioOptions } from "child_process";

export const createRunTools = (
  run: (
    cmd: string,
    stdio?: StdioOptions | undefined,
    showExecuteCmd?: boolean | undefined,
  ) => string,
) => {
  const getOutPut = (cmd: string) =>
    run(cmd, "pipe", false).replace(/[\f\n\r\t\v]/g, "");

  const getRegistry = () => getOutPut("npm get registry");

  const getBranch = () => getOutPut("git symbolic-ref --short -q HEAD");

  const getVersion = (tools: string) => getOutPut(`${tools} --version`);

  return {
    getOutPut,
    getRegistry,
    getBranch,
    getVersion,
  };
};
