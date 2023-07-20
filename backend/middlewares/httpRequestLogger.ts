import morgan from "morgan";
import LoggerService from "../services/logger.service";

export default function HTTP_Request_Logger() {
  return morgan("dev", {
    stream: {
      write: (message: string) => LoggerService.logInfo(message),
    },
  });
}
