import { CliCore } from "@oishi/cli-core";
import git from "./command/git";
import npm from "./command/npm";
import run from "./command/run";

import souche from "./command/souche";

const cli = new CliCore({
  name: "cli",
  description: "自用 cli 合集",
  version: "0.0.1",
  commands: [git, npm, run, souche],
  config: { interactive: true },
});

cli.execute();
