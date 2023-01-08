import { createCommand } from "commander";
import { runLineCmd } from "@/util";

const arr = ["npm", "yarn", "nrm", "http-server", "envinfo"];

const installGlobalTools = () =>
  createCommand("installGlobalTools")
    .description(`自动全局安装最新的常用的工具，${arr.join(", ")}`)
    .action(async (params) => {
      const run = runLineCmd();
      await run(`npm install -g ${arr.join(" ")}`);
    });

export default installGlobalTools;
