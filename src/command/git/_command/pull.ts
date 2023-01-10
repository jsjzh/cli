import { createCommand } from "commander";
import { runLineCmd } from "@/util";
import { createLogger } from "@/util/logger";
const logger = createLogger({ appName: "GIT_PULL" });

const pull = () =>
  createCommand("pull")
    .description("自动运行 git pull")
    .action((params) => {
      const run = runLineCmd();
      run("git pull");
      logger.info("git pull 运行成功");
    });

export default pull;
