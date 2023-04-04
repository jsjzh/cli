import { createGlobalDataTools, createRunTools } from "@/util";
import { CliCommand } from "@oishi/cli-core";

const createGitPushTagGlobalTools = (name: string) =>
  createGlobalDataTools("git-push", name);

const globalDataPushTypeMarkTools =
  createGitPushTagGlobalTools("pushTypeMark.json");

// feat: 新功能、新特性
// fix: 修改 bug
// perf: 更改代码，以提高性能
// refactor: 代码重构
// docs: 文档修改
// style: 代码格式修改
// test: 测试用例新增、修改
// build: 影响项目构建或依赖项修改
// revert: 恢复上一次提交
// ci: 持续集成相关文件修改
// chore: 其他修改
// release: 发布新版本
// workflow: 工作流相关文件修改

interface IArgs {
  message: string;
}

interface IOpts {
  user: string;
  type: string;
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
    type: {
      description: "选择此次发布的内容类型",
      choices: [
        "feat: 新功能、新特性",
        "fix: 修改 bug",
        "chore: 其他修改",
        "docs: 文档修改",
        "build: 影响项目构建或依赖项修改",
        "style: 代码格式修改",
        "refactor: 代码重构",
        "perf: 更改代码，以提高性能",
        "test: 测试用例新增、修改",
        "revert: 恢复上一次提交",
        "ci: 持续集成相关文件修改",
        "release: 发布新版本",
        "workflow: 工作流相关文件修改",
      ],
      default: "chore: 其他修改",
    },
    user: {
      description: "选择要提交的用户",
      choices: ["jinzhehao", "jsjzh"],
      default: "jinzhehao",
    },
  },
  action(props) {
    const run = props.helper.runCmd();
    const tools = createRunTools(run);
    const branch = tools.getBranch();

    run(`git config --local user.name "${props.data.user}"`);

    run(
      `git config --local user.email "${
        users[props.data.user as keyof typeof users].email
      }"`,
    );

    const type = props.data.type?.split(": ")[0] || "chore";

    run(`git pull origin ${branch}`);
    run("git add .");
    run(`git commit -m '${type}: ${props.data.message}'`);
    run(`git push origin ${branch}`);

    props.logger.info(
      `自动推送 ${process.cwd()} 项目下的所有内容至远端 ${branch} 分支成功`,
    );

    let result: {
      type: string;
      count: number;
    }[] = [];

    try {
      result = globalDataPushTypeMarkTools.readJSON();
    } catch (error) {
      result = [];
    }

    const item = result.find((item) => item.type === type);

    if (item) {
      item.count++;
    } else {
      result.push({ type, count: 1 });
    }

    const nextResult = result.sort((a, b) => b.count - a.count);

    nextResult.forEach((item) =>
      props.logger.info(`${item.type} 已被调用 ${item.count} 次`),
    );

    globalDataPushTypeMarkTools.writeJSON(nextResult);
    props.logger.info("记录成功");
  },
});
