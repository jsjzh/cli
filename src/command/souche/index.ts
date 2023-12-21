import { CliCommand } from "@oishi/cli-core";
import docker from "./cmd/docker";

export default new CliCommand({
  command: "souche",
  description: "souche 命令合集",
  commands: [docker],
});
