import { CliCommand } from "@oishi/cli-core";

const arr = ["npm", "yarn", "nrm", "http-server", "envinfo", "ts-node", "pm2"];

export default new CliCommand({
  command: "installGlobalTools",
  description: `自动全局安装最新的常用的工具，${arr.join(", ")}`,
  action(props) {
    const run = props.helper.runCmd();
    run(`npm install -g ${arr.join(" ")}`);
    arr.forEach(async (tools) => {
      const version = await run(`${tools} --version`, "pipe", false);
      props.logger.info(`${tools} 的版本为：${version.replace(/\s/, "")}`);
    });
  },
});
