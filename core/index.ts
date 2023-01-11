import { Command } from "commander";
import CliCommand from "./cliCommand";
import {
  createCronJob,
  createRunCmd,
  createLogger,
  createRunTask,
} from "./shared";

interface CliConfig {
  name: string;
  version: string;
  description: string;
  commands: CliCommand[];
  context: () => { [k: keyof any]: any };
  helper: { [k: keyof any]: any };
  // configs: { [k: keyof any]: any };
}

export default class Cli {
  program: Command;
  baseConfig: CliConfig;
  helper: {
    logger: ReturnType<typeof createLogger>;
    runCmd: ReturnType<typeof createRunCmd>;
    runTask: ReturnType<typeof createRunTask>;
    cronJob: ReturnType<typeof createCronJob>;
    [k: keyof any]: any;
  };

  constructor(config: CliConfig) {
    this.baseConfig = config;
    this.createProgram();
    this.createHelper();
    this.createCommand();
  }

  createProgram() {
    this.program = new Command(this.baseConfig.name)
      .version(this.baseConfig.version)
      .description(this.baseConfig.description);
  }

  createHelper() {
    const logger = createLogger({ appName: this.baseConfig.name });

    this.helper = {
      logger,
      runCmd: createRunCmd(logger),
      runTask: createRunTask(logger),
      cronJob: createCronJob(),
      ...this.baseConfig.helper,
    };
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

const command = new CliCommand({
  command: "say",
  description: "say hello",
  options: [],
  commands: [],
  context() {
    return { age: 18 };
  },
  helper: {},
  task: async (props) => {
    props.helper.logger.error("yeah");
    const run = props.helper.runCmd();
    await run("echo hello");

    props.helper
      .runTask({ hasTip: true })
      .add({
        title: "test 1",
        task: async () => {
          props.helper.logger.error("yeah");
        },
      })
      .add({
        title: "test 2",
        task: async () => {
          await run("echo hello");
        },
      })
      .run();

    console.log(props.context.age);
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
