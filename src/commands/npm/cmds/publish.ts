import { createRunTools } from "@/util";
import { CliCommand } from "@oishi/cli-core";

interface IArgs {
  message: string;
}

interface IOpts {
  buildCmd: string;
  version: string;
  registry: string;
  user: string;
}

const users = {
  jsjzh: { email: "kimimi_king@163.com" },
  jinzhehao: { email: "jinzhehao@souche.com" },
};

export default new CliCommand<IArgs, IOpts>({
  command: "publish",
  description: `自动构建并发布 npm，自动提交至 github`,
  arguments: {
    message: { description: "输入 git push 的内容" },
  },
  options: {
    buildCmd: {
      description: "输入构建指令",
      default: "npm run build",
    },
    version: {
      description: "输入发布时的版本升级方式",
      default: "patch",
      choices: ["major", "minor", "patch", "premajor", "preminor", "prepatch"],
    },
    registry: {
      description: "输入要发布的 registry",
      default: "https://registry.npmjs.org/",
    },
    user: {
      description: "选择要提交的用户",
      choices: ["jinzhehao", "jsjzh"],
      default: ["jinzhehao"],
    },
  },
  async action(props) {
    const run = props.helper.runCmd();
    const tools = createRunTools(run);
    const oldRegistry = tools.getRegistry();
    const branch = tools.getBranch();

    await props.helper
      .runTask({ hasTip: true })
      .add({
        title: "获取最新代码",
        async task() {
          run(`git pull origin ${branch}`);
        },
      })
      .add({
        title: "切换 registry",
        async task() {
          run(`npm set registry=${props.data.registry}`);
        },
      })
      .add({
        title: "将变更提交到 git 缓存区",
        async task() {
          run(`git config --local user.name "${props.data.user}"`);
          run(
            `git config --local user.email "${
              users[props.data.user as keyof typeof users].email
            }"`,
          );

          run("git add .");
          run(`git commit -m '${props.data.message}'`);
        },
      })
      .add({
        title: "执行项目构建",
        async task() {
          run(props.data.buildCmd!);
        },
      })
      .add({
        title: "执行版本升级",
        async task() {
          run(`npm version ${props.data.version}`);
        },
      })
      .add({
        title: "执行发布",
        async task() {
          run(`npm publish`);
        },
      })
      .add({
        title: "提交代码",
        async task() {
          run(`git push origin ${branch}`);
        },
      })
      .add({
        title: "切换 registry 至发布前",
        async task() {
          run(`npm set registry=${oldRegistry}`);
        },
      })
      .run();
  },
});
