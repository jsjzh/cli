import { createCommand } from "commander";
import installGlobalTools from "./_command/installGlobalTools";

const npm = () => {
  const program = createCommand("npm");
  program.description("npm 相关脚本合集");
  program.addCommand(installGlobalTools());
  return program;
};

export default npm;
