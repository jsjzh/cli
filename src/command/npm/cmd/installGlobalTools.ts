import { createRunTools } from "@/util";
import { CliCommand } from "@oishi/cli-core";

const arr = [
  // ["npm", "npm"],
  ["yarn", "yarn"],
  ["pnpm", "pnpm"],
  // ["cnpm", "cnpm"],
  ["prettier", "prettier"],
  ["envinfo", "envinfo"],
  // ["pm2", "pm2"],
  ["http-server", "http-server"],
  // ["rollup", "rollup"],
  // ["parcel", "parcel"],
  // ["esbuild", "esbuild"],
  ["tsx", "tsx"],
  ["ts-node", "ts-node"],
  ["typescript", "tsc"],
  // ["@nestjs/cli", "nest"],
  // ["create-next-app", "create-next-app"],
];

const deps = arr.map((item) => item[0]);
const clis = arr.map((item) => item[1]);

export default new CliCommand({
  command: "installGlobalTools",
  description: `自动全局安装最新的常用的工具，${deps.join(", ")}`,
  action(props) {
    const run = props.runCmd();
    const tools = createRunTools(run);

    const oldVersions = clis.map((cli) => tools.getVersion(cli));

    run(`npm install -g ${deps.join(" ")}`);

    const newVersions = clis.map((cli) => tools.getVersion(cli));

    deps.forEach((dep, index) => {
      if (oldVersions[index] === newVersions[index]) {
        props.logger.info(
          `${dep} 版本未发生变更，当前版本 ${newVersions[index]}`,
        );
      } else {
        props.logger.info(
          `${dep} 版本变更：${oldVersions[index]} ---> ${newVersions[index]}`,
        );
      }
    });
  },
});
