import { Command, createCommand } from "commander";
import Cli from "./index";
import {
  createCronJob,
  createRunCmd,
  createLogger,
  createRunTask,
} from "./shared";

interface CliCommandConfig {
  command: string;
  description: string;
  options: [];
  commands: CliCommand[];
  context: () => { [k: keyof any]: any };
  helper: { [k: keyof any]: any };
  // configs: { [k: keyof any]: any };
  task: (props: {
    params: { [k: keyof any]: any };
    context: { [k: keyof any]: any };
    logger: ReturnType<typeof createLogger>;
    helper: {
      logger: ReturnType<typeof createLogger>;
      runCmd: ReturnType<typeof createRunCmd>;
      runTask: ReturnType<typeof createRunTask>;
      cronJob: ReturnType<typeof createCronJob>;
      [k: keyof any]: any;
    };
  }) => void;
}

export default class CliCommand {
  baseConfig: CliCommandConfig;

  constructor(config: CliCommandConfig) {
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
        helper: { ...cli.helper, ...this.baseConfig.helper },
        logger: cli.baseConfig.helper.logger,
      }),
    );
    if (this.baseConfig.commands.length) {
      this.baseConfig.commands.forEach((command) => command.createCommand(cli));
    }
    return program;
  }
}
