import { createRunTools } from "@/util";
import { CliCommand } from "@oishi/cli-core";
import { readJsonSync } from "fs-extra";
import path from "path";

interface IArgs {}

interface IOpts {
  type: string;
}

export default new CliCommand<IArgs, IOpts>({
  command: "updateDep",
  description: "更新项目下的依赖至最新版本",
  options: {
    type: {
      description: "需要更新的依赖类型",
      choices: ["dep", "devDep", "all"],
      default: "all",
    },
  },
  action(props) {
    const run = props.helper.runCmd();
    const tools = createRunTools(run);

    const packageLockJson: {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    } = readJsonSync(path.resolve(process.cwd(), "package.json")) || {};

    const deps = Object.keys(packageLockJson.dependencies || {});
    const devDeps = Object.keys(packageLockJson.devDependencies || {});

    if (props.data.type === "dep") {
      tools.add(deps.join(" "));
    } else if (props.data.type === "devDep") {
      tools.addDev(devDeps.join(" "));
    } else if (props.data.type === "all") {
      tools.add(deps.join(" "));
      tools.addDev(devDeps.join(" "));
    }
  },
});
