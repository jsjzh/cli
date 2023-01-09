import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const transport: DailyRotateFile = new DailyRotateFile({
  filename: "application-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint(),
  ),
  transports: [
    new winston.transports.Console(),
    transport,
    // new winston.transports.File({ filename: "combined.log" }),
  ],
});

// 传输到通道
logger.info("winston transportss");
