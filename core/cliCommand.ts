import { createCommand, createArgument, createOption } from "commander";
import {
  createLogger,
  createRunCron,
  createRunCmd,
  createRunTask,
} from "./shared";
import type { Command } from "commander";
import type Cli from "./index";

interface CliCommandConfig {
  command: string;
  description?: string;
  arguments?: {
    name: string;
    description?: string;
    selects?: string[];
    default?: [string, string];
  }[];
  options?: {
    name: string;
    description?: string;
    selects?: string[];
    default?: [string, string];
  }[];
  commands?: CliCommand[];
  context?: () => { [k: keyof any]: any };
  helper?: { [k: keyof any]: any };
  // configs: { [k: keyof any]: any };
  task?: (props: {
    args: string | number[];
    opts: { [k: keyof any]: any };
    context: { [k: keyof any]: any };
    logger: ReturnType<typeof createLogger>;
    helper: {
      runCron: ReturnType<typeof createRunCron>;
      runCmd: ReturnType<typeof createRunCmd>;
      runTask: ReturnType<typeof createRunTask>;
      [k: keyof any]: any;
    };
    instance: Command;
  }) => void;
}

export default class CliCommand {
  baseConfig: CliCommandConfig;

  constructor(config: CliCommandConfig) {
    this.baseConfig = config;
  }

  registerCommand(cli: Cli) {
    const childProgram = createCommand(this.baseConfig.command);
    childProgram.description(this.baseConfig.description || "");

    if (this.baseConfig.arguments?.length) {
      const commandArguments = this.baseConfig.arguments.map((arg) => {
        const argument = createArgument(arg.name, arg.description || "");

        return argument
          .choices(arg.selects || [])
          .default.apply(argument, arg.default || []);
      });

      commandArguments.forEach((commandArgument) =>
        childProgram.addArgument(commandArgument),
      );
    }

    if (this.baseConfig.options?.length) {
      const commandOptions = this.baseConfig.options.map((opt) => {
        const option = createOption(opt.name, opt.description || "");

        return option
          .choices(opt.selects || [])
          .default.apply(option, opt.default || []);
      });

      commandOptions.forEach((commandOption) =>
        childProgram.addOption(commandOption),
      );
    }

    if (this.baseConfig.task) {
      childProgram.action((...args) => {
        const instance: Command = args[args.length - 1];
        const _opts = args[args.length - 2];
        const _args = args.slice(0, args.length - 2);

        this.baseConfig.task!({
          args: _args,
          opts: _opts,
          context: {
            ...((cli.baseConfig.context && cli.baseConfig.context()) || {}),
            ...((this.baseConfig.context && this.baseConfig.context()) || {}),
          },
          helper: { ...cli.helper, ...(this.baseConfig.helper || {}) },
          logger: cli.helper.logger,
          instance,
        });
      });
    }

    if (this.baseConfig.commands?.length) {
      this.baseConfig.commands.forEach((command) =>
        command.registerCommand(cli),
      );
    }

    return childProgram;
  }
}
