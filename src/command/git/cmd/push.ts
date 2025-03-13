import { createGlobalDataTools, createRunTools } from "@/util";
import { CliCommand } from "@oishi/cli-core";

// TODO 需要增加一个检测，检查远程是否有分支，有的话再执行 git pull

const createGitPushTagGlobalTools = <T>(name: string) =>
  createGlobalDataTools<T>("git-push", name);

const globalDataPushTypeMark = createGitPushTagGlobalTools<
  {
    type: string;
    count: number;
  }[]
>("pushTypeMark.json");
const globalDataPushInfo =
  createGitPushTagGlobalTools<Partial<IOpts & IArgs>>("pushInfo.json");

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
  type: string;
  user: {
    name: string;
    email: string;
  };
}

let pushInfo: ReturnType<typeof globalDataPushInfo.readJSON> = {};

try {
  pushInfo = globalDataPushInfo.readJSON();
} catch (error) {
  pushInfo = {};
}

export default new CliCommand<IArgs, IOpts>({
  command: "push",
  description: "自动 push 当前分支下的所有内容至远程分支",
  arguments: {
    message: { description: "输入 push 的内容" },
  },
  options: {
    type: {
      description: "选择此次发布的内容类型",
      // TODO 这里好像使用 line 的方式只能输入 name？不能输入 value？
      choices: [
        { name: "feat: 新功能、新特性", value: "feat" },
        { name: "fix: 修改 bug", value: "fix" },
        { name: "chore: 其他修改", value: "chore" },
        { name: "docs: 文档修改", value: "docs" },
        { name: "build: 影响项目构建或依赖项修改", value: "build" },
        { name: "style: 代码格式修改", value: "style" },
        { name: "refactor: 代码重构", value: "refactor" },
        { name: "test: 测试用例新增、修改", value: "test" },
        { name: "perf: 更改代码，以提高性能", value: "perf" },
        { name: "revert: 恢复上一次提交", value: "revert" },
        { name: "ci: 持续集成相关文件修改", value: "ci" },
        { name: "release: 发布新版本", value: "release" },
        { name: "workflow: 工作流相关文件修改", value: "workflow" },
      ],
      default: "chore",
    },
    user: {
      description: "选择要提交的用户",
      choices: [
        {
          name: "金哲豪",
          value: { name: "jinzhehao", email: "jinzhehao@souche.com" },
        },
        {
          name: "jsjzh",
          value: { name: "jsjzh", email: "kimimi_king@163.com" },
        },
      ],
      default: pushInfo?.user?.name || "jinzhehao",
    },
  },
  action(props) {
    const run = props.runCmd();
    const tools = createRunTools(run);
    const branch = tools.getBranch();

    run(`git config --local user.name "${props.data.user?.name}"`);
    run(`git config --local user.email "${props.data.user?.email}"`);

    const type = props.data.type?.split(": ")[0] || "chore";

    const remoteBranchExists = tools.getOutput(
      `git ls-remote --heads origin ${branch}`,
    );

    console.log(remoteBranchExists);

    if (remoteBranchExists) {
      props.logger.error(`远端存在分支 ${branch}`);
      run(`git pull origin ${branch}`);
    } else {
      props.logger.error(`远端不存在分支 ${branch}`);
    }

    if (!tools.getGitIsChange()) {
      props.logger.info("当前分支下没有变更，无需提交");
      return;
    }

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
      result = globalDataPushTypeMark.readJSON();
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

    globalDataPushTypeMark.writeJSON(nextResult);
    globalDataPushInfo.writeJSON(props.data);
    props.logger.info("记录成功");
  },
});
