import { CliCommand } from "@oishi/cli-core";
import hosts from "./cmd/hosts";
import pull from "./cmd/pull";
import push from "./cmd/push";

export default new CliCommand({
  command: "git",
  description: "git 命令合集",
  commands: [hosts, pull, push],
  action(props) {
    props.instance.outputHelp();
  },
});
