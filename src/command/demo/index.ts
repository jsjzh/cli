import { CliCommand } from "@oishi/cli-core";
import { exec } from "child_process";

interface IArgs {
  cmd: string;
}

export default new CliCommand<IArgs>({
  command: "run",
  description: "run",
  arguments: { cmd: { description: "执行的命令" } },
  action(props) {
    [
      "/Users/dasouche/Desktop/PROJECT/git/cli-core",
      "/Users/dasouche/Desktop/PROJECT/git/cli",
      "/Users/dasouche/Desktop/PROJECT/git/tiny-code-react-jsonplaceholder-app",
      "/Users/dasouche/Desktop/PROJECT/git/tiny-code-web",
      "/Users/dasouche/Desktop/PROJECT/git/tiny-code-react",
      "/Users/dasouche/Desktop/PROJECT/git/tiny-code-react-antd-app",
    ].forEach((p) => {
      exec(props.data.cmd!, { cwd: p, encoding: "utf8" }, (error, stdout) => {
        console.log(p, stdout);
      });
    });
  },
});
