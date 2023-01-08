import { createCommand } from "commander";
import pull from "./_command/pull";
import push from "./_command/push";
import hosts from "./_command/hosts";

const git = () => {
  const program = createCommand("git");
  program.description("git 操作脚本合集");
  program.addCommand(push()).addCommand(pull()).addCommand(hosts());
  return program;
};

export default git;
