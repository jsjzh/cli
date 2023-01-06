import { Command } from "commander";

import git from "@/command/git";

const program = new Command();

program
  .name("cli")
  .description("自用 cli 合集")
  .version("0.0.1")
  .addCommand(git());

program.parse(process.argv);
