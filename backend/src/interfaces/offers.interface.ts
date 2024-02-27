import mongoose from "mongoose";
import { ObjectId } from "./global.interface";

export interface Offer {
  level: Levels;
  duration: Durations;
  pack: Packs;
  price: number;
  chapters: {
    type: mongoose.Types.ObjectId;
    ref: "chapter";
  };

  exercises: [
    {
      type: mongoose.Types.ObjectId;
      ref: "exercise";
    }
  ];
}
export interface GetOffersResponse {
  data: { offers: Offer[] };
  message: string;
  status: string;
}
export interface sendCodetOffersResponse {
  message: string;
  status: string;
  offerId: ObjectId;
}
enum Levels {
  "7th grade" = "7th grade",
  "8th grade" = "8th grade",
  "9th grade" = "9th grade",
}
enum Durations {
  "365d" = "365d",
  "183d" = "183d",
}
export enum Packs {
  Gold = "Gold",
  Silver = "Silver",
  Copper = "Copper",
}

export interface CreateOfferResponse {
  status: string;
  message: string;
}
