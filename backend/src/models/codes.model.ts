import mongoose from "mongoose";
import { ObjectId } from "../interfaces/global.interface";

export interface Code {
  code: string;
  offerId: ObjectId;
}

const codesSchema = new mongoose.Schema(
  {
    code: { type: Number, unique: true, required: true },
    offerId: {
      type: mongoose.Types.ObjectId,
      ref: "offer",
      required: true,
    },
  },

  { timestamps: true }
);

const Codes = mongoose.model<Code>("code", codesSchema);
export default Codes;
