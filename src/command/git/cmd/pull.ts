import { createRunTools } from "@/util";
import { CliCommand } from "@oishi/cli-core";

export default new CliCommand({
  command: "pull",
  description: "自动 pull 当前分支下的远程代码",
  action(props) {
    const run = props.runCmd();
    const tools = createRunTools(run);
    const branch = tools.getGitBranch();
    run(`git pull origin ${branch}`);
    props.logger.info(`获取当前分支：${branch} 下的远程代码成功`);
  },
});
