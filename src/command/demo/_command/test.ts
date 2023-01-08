import { createCommand } from "commander";
import { runLineCmd } from "@/util";

const test = () =>
  createCommand("test")
    .description("test")
    .action((params) => {
      const run = runLineCmd();
      console.log("hello world");
    });

export default test;
