import { CliCommand } from "@oishi/cli-core";
import { execSync } from "child_process";

interface IArgs {
  cmd: string;
}

export default new CliCommand<IArgs>({
  command: "run",
  description: "run",
  arguments: { cmd: { description: "执行的命令" } },
  action(props) {
    [
      // "/Users/wireless/Desktop/PROJECT/cli-core",
      "/Users/wireless/Desktop/PROJECT/cli",
      // "/Users/wireless/Desktop/PROJECT/tiny-code-web",
      // "/Users/wireless/Desktop/PROJECT/tiny-code-react",
      "/Users/wireless/Desktop/PROJECT/tiny-code-react-antd-app",
      "/Users/wireless/Desktop/PROJECT/tiny-code-react-jsonplaceholder-app",
    ].forEach((p) => {
      const data = execSync(props.data.cmd!, { cwd: p, encoding: "utf8" });
      console.log(p, data);
    });
  },
});
