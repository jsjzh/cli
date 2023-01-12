import { createCommand, createArgument, createOption } from "commander";
// import git from "@/command/git";
// import npm from "@/command/npm";
// import demo from "@/command/demo";

// new Command()
//   .name("cli")
//   .description("自用 cli 合集")
//   .version("0.0.1")
//   .addCommand(git())
//   .addCommand(npm())
//   .addCommand(demo())
//   .parse(process.argv);

import str from "./demo";

createCommand("cli")
  .version("0.0.1")
  .description("test cli")
  .addCommand(
    createCommand("start")
      .argument("<input-file>", "argument input-file")
      .argument("[output-file]", "argument output-file", "output-file")
      .addArgument(
        createArgument("<drink-size>", "drink cup size")
          .choices(["small", "medium", "large"])
          .default("small", "auto choice"),
        // .argParser((value, pre) => value),
      )
      .requiredOption("-n, --name <names...>", "input name")
      .option("-a, --age <number>", "input name")
      // .option("-C, --no-cheese", "remove cheese")
      // .option("-d, --dir <path>", "change the working directory")
      // .option("-c, --cheese [type]", "add cheese [marble]")
      .action((...args) => {
        const instance = args[args.length - 1];
        const _opts = args[args.length - 2];
        const _args = args.slice(0, args.length - 2);
        console.log("_args", _args);
        console.log("_opts", _opts);
        // console.log(args);
      }),
  )
  .usage(str)
  .parse();

// createCommand("cli")
//   .version("0.0.1")
//   .description("test cli")
//   .addCommand(
//     createCommand("start").addCommand(
//       createCommand("dev").action((...args) => {
//         // console.log("hello world");
//         console.log(args);
//       }),
//     ),
//   )
//   .parse();

interface Command {
  commands: Command[];
  arguments: Argument[];
  options: Option[];
}

interface Argument {}

interface Option {}
