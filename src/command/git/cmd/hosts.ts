import { readFileSync, writeFileSync } from "fs";
import { CliCommand } from "@oishi/cli-core";
import dayjs from "dayjs";
import api from "@/api";

export default new CliCommand({
  command: "hosts",
  description: "自动更新 hosts，需要有 /etc/hosts 的写入权限",
  async action(props) {
    const reg = /^(# @@_INSERT_START_@@)([\s\S]+)(# @@_INSERT_END_@@)$/gm;

    const hosts = await api.git.hosts();

    const str = `# @@_INSERT_START_@@\n# ${dayjs().format()}${hosts}# @@_INSERT_END_@@`;

    const oldHosts = readFileSync("/etc/hosts", { encoding: "utf-8" });

    if (!reg.test(oldHosts)) {
      props.logger.info("未发现插入 flag，insert hosts");
      writeFileSync("/etc/hosts", `${oldHosts}\n${str}`);
    } else {
      props.logger.info("发现插入 flag，update hosts");
      const newHosts = oldHosts.replace(reg, str);
      writeFileSync("/etc/hosts", newHosts);
    }

    props.logger.info("/etc/hosts 更新成功");
  },
});
