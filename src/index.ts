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

createCommand("cli")
  .version("0.0.1")
  .description("test cli")
  .addCommand(
    createCommand("start")
      .argument("<dev>", 'argument dev', "master")
      // .option("")
      // .addArgument(createArgument("[dev1]"))
      // .addArgument(createArgument("<dev2>"))
      .action((...args) => {
        console.log("hello world");
        // console.log(args);
      }),
  )
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
