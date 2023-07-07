import { CliCommand } from "@oishi/cli-core";
import paths from "./cmd/paths";
import pullAndUpdateDepVersion from "./cmd/pullAndUpdateDepVersion";

export default new CliCommand({
  command: "run",
  description: "run 命令合集",
  commands: [paths, pullAndUpdateDepVersion],
});
