import axios from "axios";

export const hosts = () =>
  axios
    .get<string>("https://git.yoqi.me/lyq/github-host/raw/master/hosts")
    .then((data) => data.data);
