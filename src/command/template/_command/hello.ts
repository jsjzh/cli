import { createCommand } from "commander";
import { runLineCmd } from "@/util";
import { createLogger } from "@/util/logger";
const logger = createLogger({ appName: "TEMPLATE_HELLO" });

const hello = () =>
  createCommand("hello")
    .description("hello world")
    .action((params) => {
      logger.info("hello world");
    });

export default hello;
