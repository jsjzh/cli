import { createCommand, createArgument, createOption } from "commander";
import type { Command } from "commander";
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

createCommand("cli")
  .version("0.0.1")
  .description("test cli")
  .addCommand(
    createCommand("start")
      // .argument("<input>", "argument input-file")
      // .argument("[output]", "argument output-file", "output-file")
      .addArgument(
        createArgument("<size>", "drink cup size")
          .choices(["small", "medium", "large"])
          .default("small", "auto choice"),
        // .argParser((value, pre) => value),
      )
      .addOption(
        createOption("-A, --no-age", "input age")
          .choices(["small", "medium", "large"])
          .default("small", "auto choice"),
        // .argParser((value, pre) => value),
      )
      // .addOption(
      //   createOption("-n, --name <name>", "input name").conflicts(["age"]),
      // )
      // .requiredOption("-n, --name <names...>", "input name")
      // .option("-a, --age <age>", "input name")
      // .option("-C, --no-cheese", "remove cheese")
      // .option("-d, --dir <path>", "change the working directory")
      // .option("-c, --cheese [type]", "add cheese [marble]")
      .action((...args) => {
        const instance: Command = args[args.length - 1];
        const _opts = args[args.length - 2];
        const _args = args.slice(0, args.length - 2);
        console.log("_args", _args);
        console.log("_opts", _opts);
        // instance.outputHelp();
        // console.log(args);
      }),
  )
  // .usage(str)
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

// interface Command {
//   commands: Command[];
//   arguments: Argument[];
//   options: Option[];
// }

// interface Argument {}

// interface Option {}
