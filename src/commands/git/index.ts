import { CliCommand } from "@oishi/cli-core";
import hosts from "./cmds/hosts";
import pull from "./cmds/pull";
import push from "./cmds/push";

export default new CliCommand({
  command: "git",
  description: "git 命令合集",
  commands: [hosts, pull, push],
});
