import { NextFunction, Request, Response } from "express";
import { Roles } from "../interfaces/auth.interface";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.userRole !== Roles.admin)
      return res
        .status(401)
        .json({ message: "you are not admin", status: "fail" });
    next();
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Internal Server Error" });

    throw new Error(`error isAdmin is ${error}`);
  }
};

export default isAdmin;
