import type { StdioOptions } from "child_process";

export const createRunTools = (
  run: (
    cmd: string,
    stdio?: StdioOptions | undefined,
    showExecuteCmd?: boolean | undefined,
  ) => string,
) => {
  const getOutput = (cmd: string) =>
    run(cmd, "pipe", false).replace(/[\f\n\r\t\v]/g, "");

  const getRegistry = () => getOutput("npm get registry");

  const getBranch = () => getOutput("git symbolic-ref --short -q HEAD");

  const getVersion = (tools: string) => getOutput(`${tools} --version`);

  return {
    getOutput,
    getRegistry,
    getBranch,
    getVersion,
  };
};
