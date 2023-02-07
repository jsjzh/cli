import { CliCommand } from "@oishi/cli-core";
import installGlobalTools from "./cmd/installGlobalTools";
import publish from "./cmd/publish";

export default new CliCommand({
  command: "npm",
  description: "npm 命令合集",
  commands: [installGlobalTools, publish],
});
