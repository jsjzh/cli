import { createCommand } from "commander";
import { runLineCmd } from "@/util";

const arr = ["npm", "yarn", "nrm", "http-server", "envinfo", "ts-node"];

const installGlobalTools = () =>
  createCommand("installGlobalTools")
    .description(`自动全局安装最新的常用的工具，${arr.join(", ")}`)
    .action(async (params) => {
      const run = runLineCmd();
      await run(`npm install -g ${arr.join(" ")}`);
      arr.forEach(async (tools) => {
        const version = await run(`${tools} --version`, false, false);
        console.log(`${tools} 的版本为：${version.replace(/\s/, "")}`);
      });
    });

export default installGlobalTools;
