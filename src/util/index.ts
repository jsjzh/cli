import { execSync } from "child_process";

export const runLineCmd = (cwd: string = process.cwd()) => {
  return async (cmd: string, showExecuteCmd = true, showStdio = true) => {
    try {
      if (showExecuteCmd) {
        console.log("");
        console.log(`将在 ${cwd} 运行指令 ${cmd}`);
        console.log("");
      }
      return execSync(cmd, {
        cwd,
        stdio: showStdio ? "inherit" : "pipe",
        encoding: "utf-8",
      });
    } catch (error) {
      throw new Error(`在 ${cwd} 运行 ${cmd} 指令出错`);
    }
  };
};
