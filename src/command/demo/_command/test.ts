import { createLogger } from "@/util/logger";
import { createCommand } from "commander";
import { CronJob } from "cron";

const logger = createLogger({ appName: "DEMO_TEST" });

const test = () =>
  createCommand("test")
    .description("test")
    .action((params) => {
      const job = new CronJob("* * * * * *", () => {
        logger.error("hello world");
      });

      job.start();
    });

export default test;
