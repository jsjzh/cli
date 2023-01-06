import { createCommand } from "commander";
import { readFileSync, writeFileSync } from "fs";
import dayjs from "dayjs";
import api from "@/api";

const hosts = () =>
  createCommand("hosts")
    .description("自动更新 hosts")
    .action(async () => {
      const hosts = await api.git.hosts();
      const str = `# @@_INSERT_START_@@\n# ${dayjs().format()}${hosts}# @@_INSERT_END_@@`;
      const oldHosts = readFileSync("/etc/hosts", { encoding: "utf-8" });
      const newHosts = oldHosts.replace(
        /^(# @@_INSERT_START_@@)([\s\S]+)(# @@_INSERT_END_@@)$/gm,
        str,
      );
      writeFileSync("/etc/hosts", newHosts);
    });

export default hosts;
