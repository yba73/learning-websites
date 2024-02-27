import { Types } from "mongoose";
import { Roles } from "./auth.interface";

export {};

declare global {
  namespace Express {
    interface Request {
      userId: ObjectId;
      userRole: Roles;
      offerCode: number;
      offerId: ObjectId;
    }
  }
}
export type ObjectId = Types.ObjectId;

export interface SuccessResponse {
  status: string;
  message: string;
}
