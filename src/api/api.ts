import axios from "axios";

export const getGitHubDNSFromGitLab = () =>
  axios
    .get<string>("https://gitlab.com/ineo6/hosts/-/raw/master/hosts")
    .then((data) => data.data);

export const getGitHubDNSFromYoqi = () =>
  axios
    .get<string>("https://git.yoqi.me/lyq/github-host/raw/master/hosts")
    .then((data) => data.data);
