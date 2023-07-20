import express from "express";
import itemRouter from "./item.route";

const ExpressAPIRouter = express.Router();

ExpressAPIRouter.use("/item", itemRouter);

export default ExpressAPIRouter;
