import { createCommand } from "commander";
import { readFileSync, writeFileSync } from "fs";
import dayjs from "dayjs";
import api from "@/api";
import { createLogger } from "@/util/logger";

const logger = createLogger({ appName: "GIT_HOSTS" });

const reg = /^(# @@_INSERT_START_@@)([\s\S]+)(# @@_INSERT_END_@@)$/gm;

const hosts = () =>
  createCommand("hosts")
    .description("自动更新 hosts，需要有 /etc/hosts 的写入权限")
    .action(async () => {
      const hosts = await api.git.hosts();

      const str = `# @@_INSERT_START_@@\n# ${dayjs().format()}${hosts}# @@_INSERT_END_@@`;

      const oldHosts = readFileSync("/etc/hosts", { encoding: "utf-8" });

      if (!reg.test(oldHosts)) {
        logger.info("未发现插入 flag，insert hosts");
        writeFileSync("/etc/hosts", `${oldHosts}\n${str}`);
      } else {
        logger.info("发现插入 flag，update hosts");
        const newHosts = oldHosts.replace(reg, str);
        writeFileSync("/etc/hosts", newHosts);
      }
      logger.info("/etc/hosts 更新成功");
    });

export default hosts;
