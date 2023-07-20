import { NextFunction, Request, Response } from "express";
import LoggerService from "../services/logger.service";

export type ErrorHandlerMiddlewareError = Error & {
  statusCode?: number
  messageCode?: "CORS_ERROR"
};

export default function ErrorHandler(
  error: ErrorHandlerMiddlewareError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error.messageCode !== "CORS_ERROR") {
    LoggerService.logError(error.stack || "");
    LoggerService.logError(error.message);
  }
  response.status(error.statusCode || 500).send(error.message);
}
