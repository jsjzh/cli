import { asyncExec } from "@/util";
import { CliCommand } from "@oishi/cli-core";

interface IArgs {
  cmd: string;
}

interface IOpts {
  paths: string;
}

const splitTag = ", ";

export default new CliCommand<IArgs, IOpts>({
  command: "paths",
  description: "在不同目录下执行命令",
  arguments: { cmd: { description: "输入执行命令" } },
  options: { paths: { description: `执行命令的路径，用「${splitTag}」分割` } },
  action(props) {
    props.data.paths?.split(splitTag).forEach(async (p) => {
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
  },
});
