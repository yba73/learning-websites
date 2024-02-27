import { NextFunction, Request, Response } from "express";
import mongoose, { ObjectId } from "mongoose";
import { ErrorResponse } from "../interfaces/error.interface";

export const validateObjectId = async (
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).json({ status: "fail", message: "invalid id" });

  next();
};

export const validateObjectOfferId = async (
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) => {
  if (!mongoose.isValidObjectId(req.params.offerId))
    return res
      .status(400)
      .json({ status: "fail", message: "invalid offer id" });

  next();
};

export const validateObjectChapterId = async (
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) => {
  if (!mongoose.isValidObjectId(req.params.chapterId))
    return res
      .status(400)
      .json({ status: "fail", message: "invalid offer id" });

  next();
};
