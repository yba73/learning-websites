import { ErrorRequestHandler, Request, Response } from "express";
import { ErrorResponse } from "./../interfaces/error.interface";
import bcrypt from "bcryptjs";

import {
  Offer,
  CreateOfferResponse,
  GetOffersResponse,
} from "../interfaces/offers.interface";
import Offers from "../models/offers.model";
import { valdiateCreateOffer } from "../utils/schemas/offers.shema";

/**
 * @desc create new offer
 * @params POST /api/v1/offer
 * @access Private (admin)
 **/
export const createOffer = async (
  req: Request<{}, {}, Offer>,
  res: Response<CreateOfferResponse | ErrorResponse>
) => {
  try {
    const { error } = valdiateCreateOffer(req.body);
    if (error)
      return res
        .status(400)
        .json({ status: "fail", message: error.details[0].message });
    const { level, duration, pack, price }: Offer = req.body;

    const code = Math.trunc(Math.random() * Math.pow(10, 14));

    const offer = await Offers.create({
      level,
      duration,
      pack,
      price,
    });

    return res.status(201).json({
      message: "offer has been created successfully",
      status: "sucess",
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
    throw new Error(`error create offer ${error}`);
  }
};

/**
 * @desc create new offer
 * @params POST /api/v1/offer
 * @access Private (admin)
 **/
export const getOffers = async (
  req: Request<{}, {}, {}>,
  res: Response<GetOffersResponse | ErrorResponse>
) => {
  try {
    const offers = await Offers.find();
    return res.status(201).json({
      message: "offer has been created successfully",
      status: "sucess",
      data: { offers },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
    throw new Error(`error create offer ${error}`);
  }
};
