import { readFileSync, writeFileSync } from "fs";
import { CliCommand } from "@oishi/cli-core";
import dayjs from "dayjs";
import api from "@/api";

export default new CliCommand({
  command: "hosts",
  description: "自动更新 hosts，需要有 /etc/hosts 的写入权限",
  action(props) {
    props.logger.info("/etc/hosts 更新成功");

    const job = props.helper.runCron({
      cronTime: "0 0 11 * * *",
      async onTick() {
        const reg =
          /^(# @@_INSERT_GIT_HOST_START_@@)([\s\S]+)(# @@_INSERT_GIT_HOST_END_@@)$/gm;

        const hosts = await api.yoqi.hosts();

        const str = `# @@_INSERT_GIT_HOST_START_@@\n# ${dayjs().format()}${hosts}# @@_INSERT_GIT_HOST_END_@@`;

        const oldHosts = readFileSync("/etc/hosts", { encoding: "utf-8" });

        if (!reg.test(oldHosts)) {
          props.logger.info("未发现插入 flag，insert hosts");
          writeFileSync("/etc/hosts", `${oldHosts}\n${str}`);
        } else {
          props.logger.info("发现插入 flag，update hosts");
          const newHosts = oldHosts.replace(reg, str);
          writeFileSync("/etc/hosts", newHosts);
        }
      },
    });

    job.start();
  },
});
