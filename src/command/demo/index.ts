import { CliCommand } from "@oishi/cli-core";

export default new CliCommand({
  command: "demo",
  description: "测试指令",
  arguments: {
    name: { description: "请输入名称" },
    age: { description: "请输入年龄" },
  },
  options: {
    names: { description: "请输入名称" },
    ages: { description: "请输入年龄" },
  },
  action(props) {
    console.log("您输入的名称是：", props.data.name);
    console.log("您输入的年龄是：", props.data.name);
    console.log(props.data);
  },
});
