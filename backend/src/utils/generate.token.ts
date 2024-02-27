import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { ObjectId } from "../interfaces/global.interface";
import { Roles } from "../interfaces/auth.interface";

export const generateToken = async (
  id: ObjectId,

  role: Roles,
  expiresIn: string,
) => {
  const secretKey: Secret | undefined = process.env.JWT_SECRET;
  //  or const secretKey: Secret = String (process.env.JWT_SECRET);
  if (!secretKey)
    throw new Error("no secretKey, process.env.JWT_SECRET = undefined");
  return jwt.sign({ id, role }, secretKey, {
    expiresIn: expiresIn,
  });
};
