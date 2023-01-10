import { Command, createCommand } from "commander";

interface CliConfig {
  name: string;
  version: string;
  description: string;
  commands: CliCommand[];
  context: () => { [k: string]: any };
  helper: any;
  // configs: { [k: string]: any };
}

class Cli {
  program: Command;
  baseConfig: CliConfig;

  constructor(config: CliConfig) {
    this.baseConfig = config;
    this.createProgram();
    this.createCommand();
  }

  createProgram() {
    this.program = new Command(this.baseConfig.name)
      .version(this.baseConfig.version)
      .description(this.baseConfig.description);
  }

  createCommand() {
    this.baseConfig.commands.forEach((command) =>
      this.program.addCommand(command.createCommand(this)),
    );
  }

  execute() {
    this.program.parse();
  }
}

interface Context {}

interface Helper {
  cron: any;
  task: any;
  runLineCmd: any;
}

interface Logger {}

interface Props {
  params: { [k: string]: any };
  context: Context;
  logger: Logger;
  helper: Helper;
}

interface CommandConfig {
  command: string;
  description: string;
  options: [];
  commands: CliCommand[];
  context: () => { [k: string]: any };
  helper: any;
  // configs: { [k: string]: any };
  task: (props: Props) => void;
}

class CliCommand {
  baseConfig: CommandConfig;

  constructor(config: CommandConfig) {
    this.baseConfig = config;
  }

  createCommand(cli: Cli): Command {
    const program = createCommand(this.baseConfig.command);
    program.description(this.baseConfig.description);
    if (this.baseConfig.options.length) {
      program.option.apply(program, this.baseConfig.options);
    }
    program.action((...args) =>
      this.baseConfig.task({
        params: args,
        context: { ...cli.baseConfig.context(), ...this.baseConfig.context() },
        helper: { ...cli.baseConfig.helper, ...this.baseConfig.helper },
        logger: cli.baseConfig.helper.logger,
      }),
    );
    if (this.baseConfig.commands.length) {
      this.baseConfig.commands.forEach((command) => command.createCommand(cli));
    }
    return program;
  }
}

const command = new CliCommand({
  command: "say",
  description: "say hello",
  options: [],
  commands: [],
  context() {
    return { age: 18 };
  },
  helper: {},
  task(props) {
    console.log("hello world");
  },
});

const cli = new Cli({
  name: "jzh",
  description: "hello",
  version: "0.0.1",
  commands: [command],
  helper: {},
  context() {
    return { name: "king" };
  },
});

cli.execute();
