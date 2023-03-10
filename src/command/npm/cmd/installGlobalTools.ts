import { createRunTools } from "@/util";
import { CliCommand } from "@oishi/cli-core";

const arr = [
  ["npm", "npm"],
  ["yarn", "yarn"],
  ["pnpm", "pnpm"],
  ["nrm", "nrm"],
  ["http-server", "http-server"],
  ["envinfo", "envinfo"],
  ["tsx", "tsx"],
  ["pm2", "pm2"],
  ["typescript", "tsc"],
  ["rollup", "rollup"],
  ["parcel", "parcel"],
  ["esbuild", "esbuild"],
];

const deps = arr.map((item) => item[0]);
const clis = arr.map((item) => item[1]);

export default new CliCommand({
  command: "installGlobalTools",
  description: `自动全局安装最新的常用的工具，${deps.join(", ")}`,
  action(props) {
    const run = props.helper.runCmd();
    const tools = createRunTools(run);

    const oldVersions = clis.map((cli) => tools.getVersion(cli));

    run(`npm install -g ${deps.join(" ")}`);

    const newVersions = clis.map((cli) => tools.getVersion(cli));

    props.logger.info(
      `${deps.join(", ")} 的旧版本为：${oldVersions.join(", ")}`,
    );

    props.logger.info(
      `${deps.join(", ")} 的新版本为：${newVersions.join(", ")}`,
    );
  },
});
