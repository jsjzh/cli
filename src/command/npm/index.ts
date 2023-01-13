import { CliCommand } from "@oishi/cli-core";
import installGlobalTools from "./cmd/installGlobalTools";
import publish from "./cmd/publish";

const npmCommand = new CliCommand({
  command: "npm",
  description: "npm 命令合集",
  commands: [installGlobalTools, publish],
  action(props) {
    props.instance.outputHelp();
  },
});

export default npmCommand;
