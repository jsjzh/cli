import { CliCommand } from "@oishi/cli-core";

interface IArgs {
  name: string;
}

interface IOpts {
  age: string;
}

export default new CliCommand<IArgs, IOpts>({
  command: "executeCmd",
  description: "executeCmd",
  arguments: { name: { description: "姓名" } },
  options: { age: { description: "年龄" } },
  action(props) {
    console.log(props.data.name);
    console.log(props.data.age);
  },
});
