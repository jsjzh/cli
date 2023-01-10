import { createCommand } from "commander";
import createLogger from "@/util/logger";

const logger = createLogger();

const test = () =>
  createCommand("test")
    .description("test")
    .action((params) => {
      logger.log("info", "test message %s", "my string");
      setTimeout(() => {
        logger.info("hello world 2");
      }, 500);
      logger.log("silly", "127.0.0.1 - there's no place like home");
      logger.log("debug", "127.0.0.1 - there's no place like home");
      logger.log("verbose", "127.0.0.1 - there's no place like home");
      logger.log("info", "127.0.0.1 - there's no place like home");
      logger.log("warn", "127.0.0.1 - there's no place like home");
      logger.log("error", "127.0.0.1 - there's no place like home");
      logger.info("127.0.0.1 - there's no place like home");
      logger.warn("127.0.0.1 - there's no place like home");
      logger.error("127.0.0.1 - there's no place like home");
    });

export default test;
