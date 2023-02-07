import { CliCore } from "@oishi/cli-core";
import demo from "./command/demo";
import git from "./command/git";
import npm from "./command/npm";

const cli = new CliCore({
  name: "cli",
  description: "自用 cli 合集",
  version: "0.0.1",
  commands: [git, npm, demo],
  configs: { interactive: true },
});

cli.execute();
