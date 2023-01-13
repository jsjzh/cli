import { CliCommand } from "@oishi/cli-core";
import installGlobalTools from "./cmd/installGlobalTools";

const npmCommand = new CliCommand({
  command: "npm",
  description: "npm 命令合集",
  commands: [installGlobalTools],
  action(props) {
    props.instance.outputHelp();
  },
});

export default npmCommand;
