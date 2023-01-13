import { CliCommand } from "@oishi/cli-core";

// npm publish
// ↓↓↓↓↓
// nrm use npm
// git add .
// git commit -m ""
// npm run build
// npm version patch
// npm publish
// git push origin master
// nrm use souche

export default new CliCommand({
  command: "publish",
  description: `发布 npm 至 registry.npmjs.org`,
  arguments: [
    {
      name: "-m, --message <message>",
      description: "输入 push 的内容",
    },
  ],
  options: [
    {
      name: "-b, --buildCmd <buildCmd>",
      description: "输入构建指令",
      default: ["npm run build", "默认构建指令为：npm run build"],
    },
    {
      name: "-c, --version <version>",
      description: "输入要发布的版本升级方式",
      selects: ["major", "minor", "patch", "premajor", "preminor", "prepatch"],
      default: ["patch", "默认升级方式为：patch"],
    },
  ],
  async action(props) {
    const run = props.helper.runCmd();

    const oldRegistry = run("npm get registry", "pipe", false).replace(
      /\s/g,
      "",
    );

    const branch = run(
      "git symbolic-ref --short -q HEAD",
      "pipe",
      false,
    ).replace(/\s/g, "");

    await props.helper
      .runTask({ hasTip: true })
      .add({
        title: "切换 registry 至 npm",
        async task() {
          run("npm set registry=https://registry.npmjs.org/");
        },
      })
      .add({
        title: "将变更提交到 git 缓存区",
        async task() {
          run("git add .");
          run(`git commit -m '${props.args[0]}'`);
        },
      })
      .add({
        title: "执行项目构建",
        async task() {
          run(props.opts.buildCmd);
        },
      })
      .add({
        title: "执行版本升级",
        async task() {
          run(`npm version ${props.opts.version}`);
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
