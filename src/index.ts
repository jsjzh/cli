import { Command } from "commander";
import git from "@/command/git";

new Command()
  .name("cli")
  .description("自用 cli 合集")
  .version("0.0.1")
  .addCommand(git())
  .parse(process.argv);
