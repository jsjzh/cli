import { createCommand } from "commander";
import { execSync } from "child_process";

const pull = () =>
  createCommand("pull")
    .description("自动运行 git pull")
    .action((params) => {
      execSync("git pull");
    });

export default pull;
