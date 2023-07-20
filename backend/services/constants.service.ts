import dotenv from "dotenv";
dotenv.config();

export default class ConstantsService {
  static readonly PORT: number = Number(process.env.PORT) || 0;
  static readonly HOST = process.env.HOST || "";
  static readonly MONGODB_URL = process.env.MONGODB_URL || "";
  static readonly MONGODB_USER = process.env.MONGODB_USER;
  static readonly MONGODB_PASS = process.env.MONGODB_PASS;
  static readonly MONGODB_DATABASE_NAME = process.env.MONGODB_DATABASE_NAME;
  static readonly LOG_TIMESTAMP_FORMAT = "YYYY-MM-DD HH:mm:ss.SSS";
  static readonly BACKEND_DOMAIN = "http://localhost:4000";
  static readonly FRONTEND_DOMAIN = 'https://localhost:3000';
  static readonly WHITELIST = ['http://localhost:3000', undefined];                     /* undefined for postman */
}
