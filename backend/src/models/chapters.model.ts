import mongoose from "mongoose";
import { ObjectId } from "../interfaces/global.interface";

export interface Chapter {
  title: string;
  level: Levels;
}
enum Levels {
  "7th grade" = "7th grade",
  "8th grade" = "8th grade",
  "9th grade" = "9th grade",
}

const chaptersSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    level: {
      type: String,
      required: true,
      enum: ["7th grade", "8th grade", "9th grade"],
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true }, // virtuals
    toObject: { virtuals: true }, // virtuals
  }
);
// populate posts the belongs to this user when he/she get his/her profile
chaptersSchema.virtual("lessons", {
  ref: "lesson", // ref lesson model
  foreignField: "chapterId", // field out in ref model (lesson)
  localField: "_id", // filed local id
  // compar field out and filed local and set fields in filed name posts to this model
});
const Chapters = mongoose.model<Chapter>("Chapter", chaptersSchema);
export default Chapters;
