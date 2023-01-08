import { createCommand } from "commander";
import { runLineCmd } from "@/util";

const test = () =>
  createCommand("test")
    .description("自动运行 git test")
    .action((params) => {
      const run = runLineCmd();
      console.log("run 运行成功");
    });

export default test;
