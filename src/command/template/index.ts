import { createCommand } from "commander";
import hello from "./_command/hello";

const template = () => {
  const program = createCommand("template");
  program.description("模板代码，方便拷贝");
  program.addCommand(hello());
  return program;
};

export default template;
