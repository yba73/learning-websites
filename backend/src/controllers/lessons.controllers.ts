import { ErrorRequestHandler, Request, Response } from "express";
import { ErrorResponse } from "./../interfaces/error.interface";
import bcrypt from "bcryptjs";

import { valdiateCreateOffer } from "../utils/schemas/offers.shema";
import Lessons, { Lesson } from "../models/lessons.models";
import { ObjectId, SuccessResponse } from "../interfaces/global.interface";
import { valdiateCreateLesson } from "../utils/schemas/lessons.shema";

/**
 * @desc create new lesson
 * @params POST /api/v1/lessons
 * @access Private (admin)
 **/
export const createLesson = async (
  req: Request,
  res: Response<SuccessResponse | ErrorResponse>
) => {
  try {
    const { error } = valdiateCreateLesson(req.body);
    if (error)
      return res
        .status(400)
        .json({ status: "fail", message: error.details[0].message });
    const { name, link }: Lesson = req.body;
    const chapterId = req.params.chapterId;
    if (!chapterId)
      return res.status(404).json({
        message: "chapter not found, invalid chapter id",
        status: "fail",
      });
    await Lessons.create({
      name,
      link,
      chapterId,
    });

    return res.status(201).json({
      message: "lesson has been created successfully",
      status: "sucess",
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
    throw new Error(`error create offer ${error}`);
  }
};
