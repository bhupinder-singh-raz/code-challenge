import mongoose from "mongoose";
import ConstantsService from "./constants.service";
import LoggerService from "./logger.service";

mongoose.connection.on("disconnected", () => {
  LoggerService.logError("Mongoose default connection is disconnected");
});
mongoose.connection.on("disconnecting", () => {
  LoggerService.logError("Mongoose default connection is disconnecting");
});
mongoose.connection.on("reconnected", () => {
  LoggerService.logError("Mongoose default connection is reconnected");
});
mongoose.connection.on("reconnectFailed", () => {
  LoggerService.logError("Mongoose default connection reconnectFailed event");
});
mongoose.connection.on("reconnectTries", () => {
  LoggerService.logError("Mongoose default connection reconnectTries event");
});
mongoose.connection.on("close", () => {
  LoggerService.logError("Mongoose default connection close event");
});
mongoose.connection.on("error", (err) => {
  LoggerService.logError(
    `Mongoose default connection error event: ${JSON.stringify(err)}`
  );
});

export default class DBService {
  static connectToDB() {
    mongoose
      .connect(ConstantsService.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        user: ConstantsService.MONGODB_USER,
        pass: ConstantsService.MONGODB_PASS,
        dbName: ConstantsService.MONGODB_DATABASE_NAME,
      })
      .then(() => {
        LoggerService.logInfo(
          `Mongoose default connection is open to ${ConstantsService.MONGODB_URL}`
        );
      })
      .catch((err) => {
        LoggerService.logError(`${err}`);
      });
  }
}
