import { ErrorRequestHandler, Request, Response } from "express";
import { ErrorResponse } from "./../interfaces/error.interface";

import { SuccessResponse } from "../interfaces/global.interface";

import Chapters, { Chapter } from "../models/chapters.model";
import { valdiateCreateChapter } from "../utils/schemas/chapters.shema";

/**
 * @desc create new chapter
 * @params POST /api/v1/chapters
 * @access Private (admin)
 **/
export const createChapter = async (
  req: Request<{}, {}, Chapter>,
  res: Response<SuccessResponse | ErrorResponse>
) => {
  try {
    const { error } = valdiateCreateChapter(req.body);
    if (error)
      return res
        .status(400)
        .json({ status: "fail", message: error.details[0].message });
    const { title, level }: Chapter = req.body;

    await Chapters.create({
      title,
      level,
    });

    return res.status(200).json({
      message: "chapters has been created successfully",
      status: "sucess",
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
    throw new Error(`error create chapter ${error}`);
  }
};

/**
 * @desc get all  codes
 * @params POST /api/v1/codes
 * @access Private (admin)
 **/
export const getChapters = async (req: Request, res: Response) => {
  try {
    const chapters = await Chapters.find().populate("lessons");
    return res.status(201).json({
      message: "chapters has been get successfully",
      status: "sucess",
      data: { chapters },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
    throw new Error(`error create code ${error}`);
  }
};
