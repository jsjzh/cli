import { CliCommand } from "@oishi/cli-core";
import { machineId } from "node-machine-id";
import path from "path";
import fs from "fs-extra";
import { asyncExec, createRunTools, runLineCmd } from "@/util";

interface IArgs {}

interface IOpts {}

const basePathMaps: { [k: string]: string } = {
  "8319ed5741c82e7d9eb786b092baef3f99498d91068a2f7668ec35270d2a3e1b":
    "/Users/wireless/Desktop/PROJECT",
};

const pullPaths = [
  "/blog",
  "/mark",
  "/oishi",
  "/amock",
  "/cli-core",
  "/cli",
  "/tiny-code-web",
  "/tiny-code-vue",
  "/tiny-code-react",
  "/tiny-code-react-antd-app",
  "/tiny-code-react-jsonplaceholder-app",
];

const updateDepVersionPaths = [
  "/amock",
  "/cli-core",
  "/cli",
  "/tiny-code-web",
  "/tiny-code-react",
  "/tiny-code-react-antd-app",
  "/tiny-code-react-jsonplaceholder-app",
];

export default new CliCommand<IArgs, IOpts>({
  command: "pullAndUpdateDepVersion",
  description: "pullAndUpdateDepVersion",
  arguments: {},
  options: {},
  async action(props) {
    const id = await machineId();
    const basePath = basePathMaps[id];

    if (!basePath) {
      throw new Error(`电脑唯一标识 ${id} 未录入，请录入后重试`);
    }

    const currPullPaths = pullPaths.map((item) => path.join(basePath, item));

    if (!currPullPaths.every((item) => fs.existsSync(item))) {
      throw new Error("pull 步骤发现不能解析的路径，请检查");
    }

    currPullPaths.forEach((item) => {
      const runner = runLineCmd(item);
      runner("cli git pull");
    });

    const currUpdateDepVersionPaths = updateDepVersionPaths.map((item) =>
      path.join(basePath, item),
    );

    if (!currUpdateDepVersionPaths.every((item) => fs.existsSync(item))) {
      throw new Error("updateDepversion 步骤发现不能解析的路径，请检查");
    }

    const realUpdateDepVersionPaths = currUpdateDepVersionPaths.filter(
      (item) => {
        const runner = runLineCmd(item);
        const tools = createRunTools(runner);
        return tools.getGitIsChange();
      },
    );

    if (realUpdateDepVersionPaths.length) {
      realUpdateDepVersionPaths.forEach((item) => {
        const runner = runLineCmd(item);
        runner("cli git push 'update dep version' --user jsjzh");
      });
    } else {
      console.log("没有需要 updateDepVersion 的项目");
    }

    console.log("执行完毕");
  },
});
