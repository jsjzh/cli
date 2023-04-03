import { CliCommand } from "@oishi/cli-core";
import paths from "./cmds/paths";

export default new CliCommand({
  command: "run",
  description: "run 命令合集",
  commands: [paths],
});
