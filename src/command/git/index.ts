import { createCommand } from "commander";
import pull from "./components/pull";
import push from "./components/push";
import hosts from "./components/hosts";

const git = () => {
  const program = createCommand("git");
  program.description("git 操作相关代码");
  program.addCommand(push()).addCommand(pull()).addCommand(hosts());
  return program;
};

export default git;
