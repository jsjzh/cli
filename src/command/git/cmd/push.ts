import { createRunTools } from "@/util";
import { CliCommand } from "@oishi/cli-core";

interface IArgs {
  message: string;
}

interface IOpts {
  user: string;
}

const users = {
  jsjzh: { email: "kimimi_king@163.com" },
  jinzhehao: { email: "jinzhehao@souche.com" },
};

export default new CliCommand<IArgs, IOpts>({
  command: "push",
  description: "自动 push 当前分支下的所有内容至远程分支",
  arguments: {
    message: { description: "输入 push 的内容" },
  },
  options: {
    user: {
      description: "选择要提交的用户",
      choices: ["jinzhehao", "jsjzh"],
      default: ["jinzhehao"],
    },
  },
  action(props) {
    const run = props.helper.runCmd();
    const tools = createRunTools(run);
    const branch = tools.getBranch();

    run(`git config --local user.name "${props.data.user}"`);

    run(
      `git config --local user.email "${
        users[props.data.user as keyof typeof users]
      }"`,
    );

    run("git add .");
    run(`git commit -m '${props.data.message}'`);
    run(`git push origin ${branch}`);

    props.logger.info(
      `自动推送 ${process.cwd()} 项目下的所有内容至远端 ${branch} 分支成功`,
    );
  },
});
