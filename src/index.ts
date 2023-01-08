import { Command } from "commander";
import git from "@/command/git";
import demo from "@/command/demo";

new Command()
  .name("cli")
  .description("自用 cli 合集")
  .version("0.0.1")
  .addCommand(git())
  .addCommand(demo())
  .parse(process.argv);
