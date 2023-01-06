import { Command } from "commander";
import pkg from "../package.json";
import createGitCommand from "./command/git";

const program = new Command();

program
  .name(pkg.name)
  .description(pkg.description)
  .version(pkg.version)
  .addCommand(createGitCommand());

program.parse(process.argv);
