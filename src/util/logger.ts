import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// levels
// error warn info debug

const logger = winston.createLogger({
  level: "debug",
  // format: winston.format.combine(
  //   // winston.format.align(),
  //   // winston.format.cli(),
  //   // winston.format.colorize(),
  //   // winston.format.combine(),
  //   // winston.format.errors(),
  //   // winston.format.json(),
  //   // winston.format.label(),
  //   // winston.format.logstash(),
  //   // winston.format.metadata(),
  //   // winston.format.ms(),
  //   // winston.format.padLevels(),
  //   // winston.format.prettyPrint(),
  //   // // winston.format.printf(),
  //   // winston.format.simple(),
  //   // winston.format.splat(),
  //   // winston.format.timestamp(),
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

// 传输到通道
// logger.error("error");
// logger.warn("warn");
// logger.info("info");
// logger.debug("debug");
