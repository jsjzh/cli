import { CliCommand } from "@oishi/cli-core";

interface IArgs {
  name: string;
  age: string;
}

interface IOpts {
  names: string;
  ages: string;
}

export default new CliCommand<IArgs, IOpts>({
  command: "demo",
  description: "测试指令",
  // arguments: {
  //   name: { description: "请输入名称" },
  //   age: { description: "请输入年龄" },
  // },
  options: {
    names: {
      description: "请输入名称",
      choices: ["1", "2", "3"],
      multiple: true,
    },
    ages: { description: "请输入年龄" },
  },
  action(props) {
    console.log(props.data);
  },
});
