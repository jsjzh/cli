import { CliCore } from "@oishi/cli-core";
import git from "./commands/git";
import npm from "./commands/npm";
import run from "./commands/run";

const cli = new CliCore({
  name: "cli",
  description: "自用 cli 合集",
  version: "0.0.1",
  commands: [git, npm, run],
  configs: { interactive: true },
});

cli.execute();
