import { asyncExec, createGlobalDataTools } from "@/util";
import { CliCommand } from "@oishi/cli-core";
import { readdirSync } from "fs-extra";
import path from "path";

const createGitPushTagGlobalTools = (name: string) =>
  createGlobalDataTools("run-paths", name);

const globalDataRunPathsPackTools =
  createGitPushTagGlobalTools("pathsPack.json");

const arr = [
  "amock",
  "tiny-code-react-jsonplaceholder-app",
  "tiny-code-web",
  "tiny-code-react",
  "tiny-code-react-antd-app",
];

interface IArgs {
  cmd: string;
}

export default new CliCommand<IArgs>({
  command: "paths",
  description: "在不同目录下执行命令",
  arguments: { cmd: { description: "输入执行命令" } },
  action(props) {
    let preData = [];

    try {
      preData = globalDataRunPathsPackTools.readJSON();
    } catch (error) {}

    const base = path.resolve(process.cwd());
    const dirPaths = readdirSync(base).map((dir) => path.join(base, dir));

    const currentPaths = dirPaths.filter((p) =>
      arr.includes(path.parse(p).name),
    );

    const choices = currentPaths.map((item) => ({
      name: path.parse(item).name,
      value: item,
    }));

    props.helper
      .runPrompt({ paths: preData[base] || [] })
      .addCheckbox({
        name: "paths",
        message: "请选择执行命令的文件夹",
        choices,
      })
      .execute((values) => {
        values.paths.forEach(async (p: string) => {
          try {
            const result = await asyncExec(props.data.cmd!, {
              cwd: p,
              encoding: "utf8",
            });

            console.log(p, result.stdout);
            console.log();
            console.log();
          } catch (error) {
            console.log(error);
            props.logger.error(error);
            process.exit(1);
          }
        });

        globalDataRunPathsPackTools.writeJSON({ [base]: values.paths });
      });
  },
});
