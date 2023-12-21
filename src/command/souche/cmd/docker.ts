import { asyncExec, updateVersion } from "@/util";
import { CliCommand } from "@oishi/cli-core";

interface IArgs {
  cmdType: string;
}

interface IOpts {
  paths: string;
}



export default new CliCommand<IArgs, IOpts>({
  command: "docker",
  description: "执行 docker 镜像相关操作",
  arguments: {
    cmdType: { description: "选择要执行的命令", choices: ["image"] },
  },
  options: {
    images: {
      description: "升级的镜像",
      choices: [{ name: "123", value: "hello 123" }],
    },
  },
  action(props) {
    console.log(props.data);

    // const nextVersion = updateVersion("1.2.3");
  },
});
