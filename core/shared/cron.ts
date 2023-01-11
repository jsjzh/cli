import { CronJob } from "cron";
import type { CronJobParameters } from "cron";

const createCronJob = () => (options: CronJobParameters) =>
  new CronJob(options);

export default createCronJob;
