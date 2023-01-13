import { CliCommand } from "@oishi/cli-core";

export default new CliCommand({
  command: "push",
  description: "自动 push 当前分支下的所有内容至远程分支",
  arguments: [
    {
      name: "-m, --message <message>",
      description: "输入 push 的内容",
    },
  ],
  action(props) {
    const run = props.helper.runCmd();

    const branch = run(
      "git symbolic-ref --short -q HEAD",
      "pipe",
      false,
    ).replace(/\s/g, "");

    run("git add .");
    run(`git commit -m '${props.args[0]}'`);
    run(`git push origin ${branch}`);

    props.logger.info(
      `自动推送 ${process.cwd()} 项目下的所有内容至远端 ${branch} 分支成功`,
    );
  },
});
