import type { StdioOptions } from "child_process";

export const createRunTools = (
  run: (
    cmd: string,
    stdio?: StdioOptions | undefined,
    showExecuteCmd?: boolean | undefined,
  ) => string,
) => {
  const getOutput = (cmd: string) => {
    try {
      return run(cmd, "pipe", false).replace(/[\f\n\r\t\v]/g, "");
    } catch (error) {
      return null;
    }
  };
  const getRegistry = () => getOutput("npm get registry");

  const getBranch = () => getOutput("git symbolic-ref --short -q HEAD");

  const getVersion = (tools: string) => {
    const result = getOutput(`${tools} --version`);
    return result ? result : "未安装";
  };

  return {
    getOutput,
    getRegistry,
    getBranch,
    getVersion,
  };
};
