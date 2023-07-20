import { NextFunction, Request, Response } from "express";
import LoggerService from "../../services/logger.service";
import { createItemApiPayload, deleteItemApiParams, getItemByNameApiParam, updateIemApiPayload } from "./item.type";
import ItemModel, { itemType } from "../../models/item.model";
import { EResponse } from "../../services/response.service";
import HTTPStatusCode from "../../services/httpStatusCode.service";


export async function createItem(req: Request<{}, {}, createItemApiPayload>, res: Response, next: NextFunction) {
  try {
    const reqPayload = req.body;

    const itemData = new ItemModel({ ...reqPayload });

    await itemData.save();

    return res.status(HTTPStatusCode.OK).send({ msg: EResponse.ITEM_CREATED_MSG });
  }
  catch (error) {
    LoggerService.logError(`API: ${req.url} ||  Error : ${error}`);
    next(error);
  }
}


export async function getItem(req: Request, res: Response, next: NextFunction) {
  try {
    const itemData = await ItemModel.find().select({ name: 1, status: 1, _id: 1, description: 1 }).lean();

    return res.status(HTTPStatusCode.OK).send(itemData);
  }
  catch (error) {
    LoggerService.logError(`API: ${req.url} ||  Error : ${error}`);
    next(error);
  }
}


export async function getItemByName(req: Request<getItemByNameApiParam>, res: Response, next: NextFunction) {
  try {
    const reqParams = req.params;

    if (!reqParams.name) {
      throw new Error(EResponse.NAME_PARAM_MISSING_ERROR_MSG);
    }

    const itemData = await ItemModel.findOne({ name: reqParams.name }).lean();

    return res.status(HTTPStatusCode.OK).send(itemData);
  }
  catch (error) {
    LoggerService.logError(`API: ${req.url} ||  Error : ${error}`);
    next(error);
  }
}


export async function updateItem(req: Request<{}, {}, updateIemApiPayload>, res: Response, next: NextFunction) {
  try {
    const reqPayload = req.body;

    await ItemModel.updateOne({ _id: reqPayload._id }, {
      $set: {
        ...reqPayload
      }
    });

    return res.status(HTTPStatusCode.OK).send({ msg: EResponse.ITEM_UPDATED_SUCCESSFULLY });
  }
  catch (error) {
    LoggerService.logError(`API: ${req.url} ||  Error : ${error}`);
    next(error);
  }
}


export async function deleteItem(req: Request<deleteItemApiParams>, res: Response, next: NextFunction) {
  try {
    const reqParams = req.params;

    const result = await ItemModel.deleteOne({ _id: reqParams.id });

    return res.status(HTTPStatusCode.OK).send({ msg: EResponse.ITEM_DELETED_SUCCESSFULLY });
  }
  catch (error) {
    LoggerService.logError(`API: ${req.url} ||  Error : ${error}`);
    next(error);
  }
}