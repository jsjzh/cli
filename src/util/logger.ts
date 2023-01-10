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

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.colorize(),
    winston.format.json(),
    winston.format.label({ label: "yeah" }),
    winston.format.ms(),
    winston.format.timestamp(),
    // winston.format.simple(),
    winston.format.printf((info) => {
      return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
    }),
    // myFormat,
  ),
  // format: winston.format.combine(
  //   // winston.format.align(),
  //   // winston.format.cli(),
  //   // winston.format.colorize(),
  //   // winston.format.combine(),
  //   // winston.format.errors(),
  //   // winston.format.json(),
  //   winston.format.label({ label: "hello" }),
  //   // winston.format.logstash(),
  //   // winston.format.metadata(),
  //   // winston.format.ms(),
  //   // winston.format.padLevels(),
  //   // winston.format.prettyPrint(),
  //   // // winston.format.printf(),
  //   // winston.format.simple(),
  //   // winston.format.splat(),
  //   winston.format.timestamp(),
  //   myFormat,
  //   // winston.format.uncolorize(),
  // ),
  transports: [
    new winston.transports.Console(),
    // new DailyRotateFile({
    //   datePattern: "YYYY-MM-DD-HH",
    //   filename: "application-%DATE%.log",
    //   dirname: "logs",
    //   maxSize: "20m",
    //   maxFiles: "14d",
    // }),
  ],
});

const createLogger = () => {
  return logger;
};

export default createLogger;
