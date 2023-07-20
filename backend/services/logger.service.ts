import { createLogger, format, transports } from "winston";
import ConstantsService from "./constants.service";

const LOG_FORMAT = format.combine(
  format.timestamp({
    format: ConstantsService.LOG_TIMESTAMP_FORMAT,
  }),
  format.printf((info) => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
  })
);

const logger = createLogger({
  level: "debug",
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), LOG_FORMAT),
    }),
    //   new transports.File({
    //     filename: path.join(__dirname, LOG_FOLDER_PATH),
    //     maxFiles: 5,
    //     maxsize: 100000000,
    //     format: format.combine(LOG_FORMAT),
    //   }),
  ],
});

export default class LoggerService {
  static logInfo(text: string) {
    logger.info(text);
  }
  static logError(text: string) {
    logger.error(text);
  }
}
