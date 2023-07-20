import express from "express";
import { createItem, deleteItem, getItem, getItemByName, updateItem } from "../controller/item/item.controller";

const itemRouter = express.Router();

itemRouter.get("/", getItem);
itemRouter.get("/:name", getItemByName);
itemRouter.post("/", createItem);
itemRouter.put("/", updateItem);
itemRouter.delete("/:id", deleteItem);

export default itemRouter;
