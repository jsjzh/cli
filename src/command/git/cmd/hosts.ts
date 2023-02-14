import { readFileSync, writeFileSync } from "fs";
import { CliCommand } from "@oishi/cli-core";
import dayjs from "dayjs";
import api from "@/api";
import { getMacRelease } from "@/util";

const updateDNSMaps = [
  {
    name: "Monterey",
    version: "12",
    cmd: "sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder",
  },
  {
    name: "Big Sur",
    version: "11",
    cmd: "sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder",
  },
  {
    name: "Catalina",
    version: "10.15",
    cmd: "sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder",
  },
  { name: "Mojave", version: "10.14", cmd: "sudo killall -HUP mDNSResponder" },
  {
    name: "High Sierra",
    version: "10.13",
    cmd: "sudo killall -HUP mDNSResponder",
  },
  { name: "Sierra", version: "10.12", cmd: "sudo killall -HUP mDNSResponder" },
  {
    name: "El Capitan",
    version: "10.11",
    cmd: "sudo killall -HUP mDNSResponder",
  },
  {
    name: "Yosemite",
    version: "10.10",
    cmd: "sudo discoveryutil udnsflushcaches",
  },
  {
    name: "Mavericks",
    version: "10.9",
    cmd: "sudo killall -HUP mDNSResponder",
  },
  {
    name: "Mountain Lion",
    version: "10.8",
    cmd: "sudo killall -HUP mDNSResponder",
  },
  { name: "Lion", version: "10.7", cmd: "sudo killall -HUP mDNSResponder" },
  {
    name: "Snow Leopard",
    version: "10.6",
    cmd: "sudo dscacheutil -flushcache",
  },
  { name: "Leopard", version: "10.5", cmd: "sudo lookupd -flushcache" },
  { name: "Tiger", version: "10.4", cmd: "lookupd -flushcache" },
];

export default new CliCommand({
  command: "hosts",
  description: "自动更新 hosts，需要有 /etc/hosts 的写入权限",
  async action(props) {
    const run = props.helper.runCmd();

    const reg =
      /^(# @@_INSERT_GIT_HOST_START_@@)([\s\S]+)(# @@_INSERT_GIT_HOST_END_@@)$/gm;

    let hosts = "";
    let target = "";

    try {
      target = "getGitHubDNSFromYoqi";
      hosts = await api.getGitHubDNSFromYoqi();
    } catch (error) {
      try {
        target = "getGitHubDNSFromGitee";
        hosts = await api.getGitHubDNSFromGitee();
      } catch (error) {
        try {
          target = "getGitHubDNSFromGitLab";
          hosts = await api.getGitHubDNSFromGitLab();
        } catch (error) {
          const msg = "更新 github DNS 的三个源全部失效，请重新获取";
          props.logger.error(msg);
          throw new Error(msg);
        }
      }
    }

    const str = `# @@_INSERT_GIT_HOST_START_@@\n# ${dayjs().format()}${hosts}# @@_INSERT_GIT_HOST_END_@@`;

    const oldHosts = readFileSync("/etc/hosts", { encoding: "utf-8" });

    props.logger.info(`从 ${target} 获取到 hosts`);

    if (!reg.test(oldHosts)) {
      props.logger.info("未发现插入 flag，insert hosts");
      writeFileSync("/etc/hosts", `${oldHosts}\n${str}`);
    } else {
      props.logger.info("发现插入 flag，update hosts");
      const newHosts = oldHosts.replace(reg, str);
      writeFileSync("/etc/hosts", newHosts);
    }

    props.logger.info("/etc/hosts 更新成功");

    const { name, version } = getMacRelease();

    const updateItem = updateDNSMaps.find(
      (item) => item.name === name || item.version === version,
    );

    if (updateItem) {
      props.logger.info("查询到您的机器所适配的更新 DNS 指令，将刷新 DNS 缓存");
      run(updateItem.cmd);
    } else {
      props.logger.info(
        "未查询到您的机型所适配的更新 DNS 指令，hosts 可能存在缓存",
      );
    }
  },
});
