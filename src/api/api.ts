import axios from "axios";

export const getGitHubDNSFromYoqi = () =>
  axios
    .get<string>("https://git.yoqi.me/lyq/github-host/raw/master/hosts")
    .then((data) => data.data);

export const getGitHubDNSFromGitHub520 = () =>
  axios
    .get<string>(
      "https://raw.githubusercontent.com/521xueweihan/GitHub520/main/hosts",
    )
    .then((data) => data.data);

export const getGitHubDNSFromIneo6 = () =>
  axios
    .get<string>(
      "https://raw.githubusercontent.com/ineo6/hosts/master/next-hosts",
    )
    .then((data) => data.data);
