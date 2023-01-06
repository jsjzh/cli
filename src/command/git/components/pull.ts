import { createCommand } from "commander";
import { runLineCmd } from "@/util";

const pull = () =>
  createCommand("pull")
    .description("自动运行 git pull")
    .action((params) => {
      const run = runLineCmd();
      run("git pull");
    });

export default pull;
