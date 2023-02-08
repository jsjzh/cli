import { CliCommand } from "@oishi/cli-core";

interface IArgs {
  name: string;
  born: number;
}

interface IOpts {
  fruits: string[];
  profession: string;
}

export default new CliCommand<IArgs, IOpts>({
  command: "demo",
  description: "登录并注册",
  arguments: {
    name: { description: "请输入您的名称" },
    born: { description: "请输入您的出生年份" },
  },
  options: {
    fruits: {
      alias: "f",
      description: "请选择您喜欢的水果",
      choices: ["苹果", "雪梨", "樱桃"],
      multiple: true,
    },
    profession: {
      alias: "p",
      description: "请选择您的职业",
      choices: ["开发", "测试", "设计", "产品", "其他"],
    },
  },
  action(props) {
    const run = props.helper.runCmd();

    const age = new Date().getFullYear() - (props.data.born || 0);

    props.logger.info(
      `${props.data.name} 您好，您的年龄是 ${age}，职业是 ${
        props.data.profession
      }，喜欢吃的水果是 ${props.data.fruits?.join(", ")}`,
    );

    run("echo hello world");
  },
});
