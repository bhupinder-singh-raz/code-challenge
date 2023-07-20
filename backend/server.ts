import express from "express";
import ErrorHandler, { ErrorHandlerMiddlewareError } from "./middlewares/errorHandler";
import HTTP_Request_Logger from "./middlewares/httpRequestLogger";
import ExpressAPIRouter from "./routes/index.route";
import ConstantsService from "./services/constants.service";
import DBService from "./services/db.service";
import LoggerService from "./services/logger.service";
import cors from "cors";
import HTTPStatusCode from "./services/httpStatusCode.service";
import helmet from "helmet";

const app = express();

DBService.connectToDB();

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));


app.use(cors({
  origin: function (origin, callback) {
    if (ConstantsService.WHITELIST.indexOf(origin as string) !== -1) {
      callback(null, true);
    }
    else {
      LoggerService.logInfo(`origin ${origin} restricted via cors`);

      const error: ErrorHandlerMiddlewareError = new Error("Unauthrozied");
      error.statusCode = HTTPStatusCode.UNAUTHORIZED
      error.messageCode = "CORS_ERROR";

      // This error callback will be handled by error handler middleware
      callback(error);
      return;
    }
  },
  credentials: true // Allow credentials in requests
}));

app.use(helmet());

app.use(HTTP_Request_Logger());


app.use("/", ExpressAPIRouter);

app.use(ErrorHandler);

app.listen(
  ConstantsService.PORT,
  ConstantsService.HOST,
  () => {
    LoggerService.logInfo(
      `Server running at http://${ConstantsService.HOST}:${ConstantsService.PORT}/`
    );
  }
);
