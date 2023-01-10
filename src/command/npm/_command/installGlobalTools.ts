import { createCommand } from "commander";
import { runLineCmd } from "@/util";
import { createLogger } from "@/util/logger";
const logger = createLogger({ appName: "NPM_INSTALLGLOBALTOOLS" });

const arr = ["npm", "yarn", "nrm", "http-server", "envinfo", "ts-node", "pm2"];

const installGlobalTools = () =>
  createCommand("installGlobalTools")
    .description(`自动全局安装最新的常用的工具，${arr.join(", ")}`)
    .action(async (params) => {
      const run = runLineCmd();
      await run(`npm install -g ${arr.join(" ")}`);
      arr.forEach(async (tools) => {
        const version = await run(`${tools} --version`, false, false);
        logger.info(`${tools} 的版本为：${version.replace(/\s/, "")}`);
      });
    });

export default installGlobalTools;
