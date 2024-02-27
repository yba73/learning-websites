import { ErrorResponse } from "./../interfaces/error.interface";
import { DecodedToken, Roles } from "./../interfaces/auth.interface";
import { NextFunction, Request, Response } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

const authMiddleware = async (
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) => {
  try {
    const secretKey: Secret | undefined = process.env.JWT_SECRET;
    //  or const secretKey: Secret = String (process.env.JWT_SECRET);
    if (!secretKey) {
      res.status(500).json({
        status: "fail",
        message: "something wrong",
      });
      throw new Error("no secretKey, process.env.JWT_SECRET = undefined");
    }

    const token: string | undefined = req.headers.authorization;
    jwt.verify(token as string, secretKey, (error, result) => {
      if (error)
        return res.status(401).json({
          status: "fail",
          message: error.message,
        });
      else {
        req.userId = (result as unknown as DecodedToken).id;
        req.userRole = (result as unknown as DecodedToken).role;
        next();

        return result;
      }
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "something wrong" });
    throw new Error(`error authMiddleware is ${error}`);
  }
};

export default authMiddleware;
