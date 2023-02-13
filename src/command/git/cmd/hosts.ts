import { readFileSync, writeFileSync } from "fs";
import { CliCommand } from "@oishi/cli-core";
import dayjs from "dayjs";
import api from "@/api";

export default new CliCommand({
  command: "hosts",
  description: "自动更新 hosts，需要有 /etc/hosts 的写入权限",
  async action(props) {
    const reg =
      /^(# @@_INSERT_GIT_HOST_START_@@)([\s\S]+)(# @@_INSERT_GIT_HOST_END_@@)$/gm;

    let hosts = "";

    try {
      hosts = await api.updateGitHubDNSFromYoqi();
    } catch (error) {
      try {
        hosts = await api.updateGitHubDNSFromGitee();
      } catch (error) {
        try {
          hosts = await api.updateGitHubDNSFromGitLab();
        } catch (error) {
          const msg = "更新 github DNS 的三个源全部失效，请重新获取";
          props.logger.error(msg);
          throw new Error(msg);
        }
      }
    }

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

    props.logger.info("/etc/hosts 更新成功");
  },
});
