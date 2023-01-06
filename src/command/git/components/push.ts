import { createCommand } from "commander";
import { execSync } from "child_process";

export default () =>
  createCommand("push")
    .requiredOption("-b, --branch <branch>", "输入 push 的分支", "master")
    .requiredOption("-m, --message <message>", "输入 push 的内容")
    .action((params) => {
      execSync("git add .");
      execSync(`git commit -m '${params.message}'`);
      execSync(`git push origin ${params.branch}`);
    });
