import { createCommand } from "commander";
import { execSync } from "child_process";

const push = () =>
  createCommand("push")
    .description("自动运行 git push 相关的命令行")
    .requiredOption("-b, --branch <branch>", "输入 push 的分支", "master")
    .requiredOption("-m, --message <message>", "输入 push 的内容")
    .action((params) => {
      execSync("git add .");
      execSync(`git commit -m '${params.message}'`);
      execSync(`git push origin ${params.branch}`);
    });

export default push;
