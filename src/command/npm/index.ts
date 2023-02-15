import { CliCommand } from "@oishi/cli-core";

import install from "./cmd/install";
import installGlobalTools from "./cmd/installGlobalTools";
import publish from "./cmd/publish";
import updateDep from "./cmd/updateDep";

export default new CliCommand({
  command: "npm",
  description: "npm 命令合集",
  commands: [install, installGlobalTools, publish, updateDep],
});
