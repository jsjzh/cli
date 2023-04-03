import { asyncExec } from "@/util";
import { CliCommand } from "@oishi/cli-core";
import {
  ensureFileSync,
  readJSONSync,
  readdirSync,
  writeJSONSync,
} from "fs-extra";
import path from "path";

const runPathsPackPath = `${process.env.HOME}/logs/oishi/cli/run-paths/paths-pack.json`;

const arr = [
  "cli-core",
  "cli",
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
    ensureFileSync(runPathsPackPath);

    let preData = [];

    try {
      preData = readJSONSync(runPathsPackPath);
    } catch (error) {}

    const base = path.resolve(process.cwd(), "../");
    const dirPaths = readdirSync(base).map((dir) => path.join(base, dir));

    const currentPaths = dirPaths.filter((p) =>
      arr.includes(path.parse(p).name),
    );

    const choices = currentPaths.map((item) => ({
      name: path.parse(item).name,
      value: item,
    }));

    props.helper
      .runPrompt({ paths: preData })
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

            props.logger.info(p, result.stdout);
            console.log();
          } catch (error) {
            process.exit(1);
          }
        });

        writeJSONSync(runPathsPackPath, values.paths);
      });
  },
});
