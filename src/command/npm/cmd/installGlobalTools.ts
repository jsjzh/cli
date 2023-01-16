import { createRunTools } from "@/util";
import { CliCommand } from "@oishi/cli-core";

const arr = ["npm", "yarn", "nrm", "http-server", "envinfo", "ts-node", "pm2"];

export default new CliCommand({
  command: "installGlobalTools",
  description: `自动全局安装最新的常用的工具，${arr.join(", ")}`,
  action(props) {
    const run = props.helper.runCmd();
    const tools = createRunTools(run);

    const oldVersions = arr.map((_tools) => tools.getVersion(_tools));

    run(`npm install -g ${arr.join(" ")}`);

    const newVersions = arr.map((_tools) => tools.getVersion(_tools));

    props.logger.info(
      `${arr.join(", ")} 的旧版本为：${oldVersions.join(", ")}`,
    );

    props.logger.info(
      `${arr.join(", ")} 的新版本为：${newVersions.join(", ")}`,
    );
  },
});
