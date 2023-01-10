import { createCommand } from "commander";
import { runLineCmd } from "@/util";
import { createLogger } from "@/util/logger";
const logger = createLogger({ appName: "GIT_PUSH" });

const push = () =>
  createCommand("push")
    .description("自动运行 git push 相关的命令行")
    .requiredOption("-b, --branch <branch>", "输入 push 的分支", "master")
    .requiredOption("-m, --message <message>", "输入 push 的内容")
    .action((params) => {
      const run = runLineCmd();

      run("git add .");
      run(`git commit -m '${params.message}'`);
      run(`git push origin ${params.branch}`);
      logger.info(
        `代码提交成功，提交分支：${params.branch}，提交内容：${params.message}`,
      );
    });

export default push;
