import { CliCommand } from "@oishi/cli-core";

import install from "./cmds/install";
import installGlobalTools from "./cmds/installGlobalTools";
import publish from "./cmds/publish";
import updateDep from "./cmds/updateDep";

export default new CliCommand({
  command: "npm",
  description: "npm 命令合集",
  commands: [install, installGlobalTools, publish, updateDep],
});
