import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// const levels = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6
// };

// errors
// logstash
// metadata
// padLevels
// simple
// splat
// uncolorize
// colorize
// combine
// cli
// align
// ms
// prettyPrint
// printf
// timestamp
// json
// label

interface ICreateLoggerOption {
  appName: string;
}

export const createLogger = (option: ICreateLoggerOption) => {
  return winston.createLogger({
    transports: [
      new DailyRotateFile({
        level: "error",
        datePattern: "YYYY-MM-DD-HH",
        filename: "%DATE%.log",
        dirname: `logs/${option.appName}`,
        maxSize: "20m",
        maxFiles: "14d",
        format: winston.format.combine(
          winston.format.label({ label: option.appName }),
          winston.format.uncolorize(),
          winston.format.splat(),
          winston.format.ms(),
          winston.format.timestamp(),
          winston.format.prettyPrint(),
        ),
      }),
      new winston.transports.Console({
        level: "info",
        format: winston.format.combine(
          winston.format.label({ label: option.appName }),
          winston.format.colorize(),
          // winston.format.align(),
          winston.format.splat(),
          winston.format.ms(),
          winston.format.timestamp(),
          // winston.format.simple(),
          winston.format.printf(
            (info) =>
              `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`,
          ),
        ),
      }),
    ],
  });
};

const logger = createLogger({ appName: "default" });

export default logger;
