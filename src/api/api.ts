import axios from "axios";

export const getGitHubDNSFromGitLab = () =>
  axios
    .get<string>("https://gitlab.com/ineo6/hosts/-/raw/master/hosts")
    .then((data) => data.data);

export const getGitHubDNSFromGitee = () =>
  axios
    .get<string>("https://gitee.com/fliu2476/github-hosts/raw/main/hosts")
    .then((data) => data.data);

export const getGitHubDNSFromYoqi = () =>
  axios
    .get<string>("https://git.yoqi.me/lyq/github-host/raw/master/hosts")
    .then((data) => data.data);
