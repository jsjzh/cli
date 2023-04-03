import { createRunTools } from "@/util";
import { CliCommand } from "@oishi/cli-core";

export default new CliCommand({
  command: "install",
  description: `安装依赖`,
  action(props) {
    const run = props.helper.runCmd();
    const tools = createRunTools(run);

    props.logger.info(`将使用 ${tools.config.use} 安装依赖`);

    tools.install();
  },
});
