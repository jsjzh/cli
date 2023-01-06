import { Command } from "commander";
import pkg from "../package.json";

import git from "./command/git";

const program = new Command();

program
  .name(pkg.name)
  .description(pkg.description)
  .version(pkg.version)
  .addCommand(git());

program.parse(process.argv);
