import mongoose from "mongoose";
import { Offer } from "../interfaces/offers.interface";
const offersSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      enum: ["7th grade", "8th grade", "9th grade"],
      required: true,
    },
    duration: { type: String, required: true, enum: ["365d", "183d"] },
    pack: { type: String, required: true, enum: ["Gold", "Silver", "Copper"] },
    price: { type: Number, required: true },
  },

  { timestamps: true }
);

const Offers = mongoose.model<Offer>("offer", offersSchema);
export default Offers;
