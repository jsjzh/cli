import { createRunTools } from "@/util";
import { CliCommand } from "@oishi/cli-core";

const arr = ["npm", "yarn", "nrm", "http-server", "envinfo", "ts-node", "pm2"];

export default new CliCommand({
  command: "installGlobalTools",
  description: `自动全局安装最新的常用的工具，${arr.join(", ")}`,
  action(props) {
    const run = props.helper.runCmd();
    const tools = createRunTools(run);
    run(`npm install -g ${arr.join(" ")}`);
    arr.forEach((_tools) => {
      const version = tools.getVersion(_tools);
      props.logger.info(`${_tools} 的版本为：${version.replace(/\s/, "")}`);
    });
  },
});
