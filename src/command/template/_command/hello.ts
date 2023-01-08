import { createCommand } from "commander";
import { runLineCmd } from "@/util";

const hello = () =>
  createCommand("hello")
    .description("hello world")
    .action((params) => {
      console.log("hello world");
    });

export default hello;
