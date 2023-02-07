import type { StdioOptions } from "child_process";
import { existsSync } from "fs-extra";
import path from "path";

export const createRunTools = (
  run: (
    cmd: string,
    stdio?: StdioOptions | undefined,
    showExecuteCmd?: boolean | undefined,
  ) => string,
) => {
  const root = process.cwd();

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

  const getPnpmLockPath = (root: string) =>
    path.resolve(root, "./pnpm-lock.yaml");

  const getYarnLockPath = (root: string) => path.resolve(root, "./yarn.lock");

  const getNpmLockPath = (root: string) =>
    path.resolve(root, "./package-lock.json");

  const pnpmLockPath = getPnpmLockPath(root);
  const yarnLockPath = getYarnLockPath(root);
  const npmLockPath = getNpmLockPath(root);

  const hasPnpmLock = existsSync(pnpmLockPath);
  const hasYarnLock = existsSync(yarnLockPath);
  const hasNpmLock = existsSync(npmLockPath);

  const use: "pnpm" | "yarn" | "npm" = hasPnpmLock
    ? "pnpm"
    : hasYarnLock
    ? "yarn"
    : "npm";

  let lockPath = hasPnpmLock
    ? pnpmLockPath
    : hasYarnLock
    ? yarnLockPath
    : npmLockPath;

  const pnpmAdd = (dep: string) => run(`pnpm install ${dep}`);
  const pnpmAddDev = (dep: string) => run(`pnpm install ${dep} -D`);
  const yarnAdd = (dep: string) => run(`yarn add ${dep}`);
  const yarnAddDev = (dep: string) => run(`yarn add ${dep} -D`);
  const npmAdd = (dep: string) => run(`npm install ${dep}`);
  const npmAddDev = (dep: string) => run(`npm install ${dep} -D`);

  return {
    getOutput,
    getRegistry,
    getBranch,
    getVersion,

    add: hasPnpmLock ? pnpmAdd : hasYarnLock ? yarnAdd : npmAdd,
    addDev: hasPnpmLock ? pnpmAddDev : hasYarnLock ? yarnAddDev : npmAddDev,

    config: {
      use,
      lockPath,
      hasPnpmLock,
      hasYarnLock,
      hasNpmLock,
      pnpmLockPath,
      yarnLockPath,
      npmLockPath,
    },
  };
};
