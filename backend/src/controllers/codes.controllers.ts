import { ErrorRequestHandler, Request, Response } from "express";
import { ErrorResponse } from "./../interfaces/error.interface";
import bcrypt from "bcryptjs";

import { ObjectId, SuccessResponse } from "../interfaces/global.interface";
import Codes from "../models/codes.model";
import Offers from "../models/offers.model";
import { Code } from "../models/codes.model";

/**
 * @desc create new code
 * @params POST /api/v1/codes
 * @access Private (admin)
 **/
export const createCode = async (
  req: Request,
  res: Response<SuccessResponse | ErrorResponse>
) => {
  try {
    const code = Math.trunc(Math.random() * Math.pow(10, 14));

    const offerId: ObjectId = req.params.offerId as unknown as ObjectId;
    console.log("=========offerId=========", offerId);

    const offer = await Offers.findById(offerId);
    console.log("=========offer=========", offer);

    if (!offer)
      return res
        .status(404)
        .json({ message: "offer not found, invalid offer id", status: "fail" });
    await Codes.create({ code, offerId });

    return res.status(201).json({
      message: "code has been created successfully",
      status: "sucess",
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
    throw new Error(`error create code ${error}`);
  }
};

/**
 * @desc get all  codes
 * @params POST /api/v1/codes
 * @access Private (admin)
 **/
export const getCodes = async (req: Request, res: Response) => {
  try {
    const codes = await Codes.find().populate("offerId");
    return res.status(200).json({
      message: "codes has been get successfully",
      status: "sucess",
      data: { codes },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
    throw new Error(`error create code ${error}`);
  }
};

/**
 * @desc get all  codes
 * @params POST /api/v1/admin/codes/checkCode/:code
 * @access Private (admin)
 **/
export const checkCode = async (req: Request, res: Response) => {
  try {
    if (!req.params.code)
      return res
        .status(400)
        .json({ message: "code is undefined", status: "fail" });
    const offerCode: Code | null = await Codes.findOne({
      code: req.params.code,
    });
    if (!offerCode)
      return res
        .status(400)
        .json({ message: "code is invalid", status: "fail" });
    const offerId = offerCode.offerId;
    return res.status(200).json({
      message: "codes has been get successfully",
      status: "sucess",
      data: {
        offerId,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
    throw new Error(`error create code ${error}`);
  }
};
