import { exec, execSync } from "child_process";
import { promisify } from "util";

import {
  ensureFileSync,
  existsSync,
  readFileSync,
  readJSONSync,
  writeFileSync,
  writeJSONSync
} from "fs-extra";
import os from "os";
import path from "path";

import type { StdioOptions } from "child_process";
import semver from "semver";

export const asyncExec = promisify(exec);

export const runLineCmd = (cwd: string = process.cwd()) => {
  return (
    cmd: string,
    stdio: StdioOptions = "inherit",
    showExecuteCmd = true,
  ) => {
    try {
      if (showExecuteCmd) {
        console.log("");
        console.log(`将在 ${cwd} 运行指令 ${cmd}`);
        console.log("");
      }
      return execSync(cmd, {
        cwd,
        stdio: stdio ? stdio : "ignore",
        encoding: "utf8",
      });
    } catch (error) {
      throw new Error(`在 ${cwd} 运行 ${cmd} 指令出错`);
    }
  };
};

export const createRunTools = (
  run: (
    cmd: string,
    stdio?: StdioOptions | undefined,
    showExecuteCmd?: boolean | undefined,
  ) => any,
) => {
  const getOutput = (cmd: string) => {
    try {
      return run(cmd, "pipe", false).replace(/[\f\n\r\t\v]/g, "");
    } catch (error) {
      return null;
    }
  };

  const getRegistry = () => getOutput("npm get registry");

  const getGitBranch = () => getOutput("git symbolic-ref --short -q HEAD");

  const getGitIsChange = () => !!getOutput("git status -s");

  const getGitRemoteBranchIsExist = (branch: string) =>
    !!getOutput(`git ls-remote --heads origin ${branch}`);

  const getVersion = (tools: string) => {
    const result = getOutput(`${tools} --version`);
    return result ? result : "未安装";
  };

  const pnpmLockPath = path.join(getOutput("pwd"), "pnpm-lock.yaml");
  const yarnLockPath = path.join(getOutput("pwd"), "yarn.lock");
  const npmLockPath = path.join(getOutput("pwd"), "package-lock.json");

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
  const yarnAdd = (dep: string) => run(`yarn add ${dep}`);
  const npmAdd = (dep: string) => run(`npm install ${dep}`);

  const pnpmAddDev = (dep: string) => run(`pnpm install ${dep} -D`);
  const yarnAddDev = (dep: string) => run(`yarn add ${dep} -D`);
  const npmAddDev = (dep: string) => run(`npm install ${dep} -D`);

  const pnpmUpdate = (dep: string) => run(`pnpm update ${dep}`);
  const yarnUpdate = (dep: string) => run(`yarn upgrade ${dep}`);
  const npmUpdate = (dep: string) => run(`npm update ${dep}`);

  const pnpmInstall = () => run(`pnpm install`);
  const yarnInstall = () => run(`yarn`);
  const npmInstall = () => run(`npm install`);

  return {
    getOutput,
    getVersion,

    getGitBranch,
    getGitIsChange,
    getGitRemoteBranchIsExist,

    getRegistry,
    add: hasPnpmLock ? pnpmAdd : hasYarnLock ? yarnAdd : npmAdd,
    addDev: hasPnpmLock ? pnpmAddDev : hasYarnLock ? yarnAddDev : npmAddDev,
    update: hasPnpmLock ? pnpmUpdate : hasYarnLock ? yarnUpdate : npmUpdate,
    install: hasPnpmLock ? pnpmInstall : hasYarnLock ? yarnInstall : npmInstall,

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

const macVersionMap = new Map([
  [21, ["Monterey", "12"]],
  [20, ["Big Sur", "11"]],
  [19, ["Catalina", "10.15"]],
  [18, ["Mojave", "10.14"]],
  [17, ["High Sierra", "10.13"]],
  [16, ["Sierra", "10.12"]],
  [15, ["El Capitan", "10.11"]],
  [14, ["Yosemite", "10.10"]],
  [13, ["Mavericks", "10.9"]],
  [12, ["Mountain Lion", "10.8"]],
  [11, ["Lion", "10.7"]],
  [10, ["Snow Leopard", "10.6"]],
  [9, ["Leopard", "10.5"]],
  [8, ["Tiger", "10.4"]],
  [7, ["Panther", "10.3"]],
  [6, ["Jaguar", "10.2"]],
  [5, ["Puma", "10.1"]],
]);

type INames =
  | "Monterey"
  | "Big Sur"
  | "Catalina"
  | "Mojave"
  | "High Sierra"
  | "Sierra"
  | "El Capitan"
  | "Yosemite"
  | "Mavericks"
  | "Mountain Lion"
  | "Lion"
  | "Snow Leopard"
  | "Leopard"
  | "Tiger"
  | "Panther"
  | "Jaguar"
  | "Puma";

type IVersions =
  | "12"
  | "11"
  | "10.15"
  | "10.14"
  | "10.13"
  | "10.12"
  | "10.11"
  | "10.10"
  | "10.9"
  | "10.8"
  | "10.7"
  | "10.6"
  | "10.5"
  | "10.4"
  | "10.3"
  | "10.2"
  | "10.1";

export const getMacRelease = () => {
  const macRelease = os.release();
  const firstReleaseVersion = Number(macRelease.split(".")[0]);
  const [name, version] = macVersionMap.get(firstReleaseVersion) || [
    "Unknown",
    "",
  ];

  return {
    name,
    version,
  } as { name: INames; version: IVersions };
};

export const createGlobalDataTools = <T = any>(
  tag: string,
  name: string,
  config?: { base: string },
) => {
  const globalDataPath = path.join(
    config?.base || process.env.HOME!,
    "logs/oishi/cli",
    tag,
    name,
  );

  ensureFileSync(globalDataPath);

  return {
    globalDataPath,

    read: () => readFileSync(globalDataPath),
    readJSON: () => readJSONSync(globalDataPath) as T,
    write: (data: string) => writeFileSync(globalDataPath, data),
    writeJSON: (obj: T) => writeJSONSync(globalDataPath, obj),
  };
};

export const updateVersion = (
  version: string,
  release: semver.ReleaseType = "patch",
) => semver.inc(version, release);
