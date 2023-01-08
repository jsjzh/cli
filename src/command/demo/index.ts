import { createCommand } from "commander";
import test from "./_command/test";

const demo = () => {
  const program = createCommand("demo");
  program.description("demo 代码");
  program.addCommand(test());
  return program;
};

export default demo;
