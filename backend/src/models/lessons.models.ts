import mongoose from "mongoose";

export interface Lesson {
  name: string;
  link: string;
}
const lessonsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    link: { type: String, required: true },

    chapterId: {
      type: mongoose.Types.ObjectId,
      ref: "chapter",
      required: true,
    },
  },

  { timestamps: true }
);

const Lessons = mongoose.model<Lesson>("lesson", lessonsSchema);
export default Lessons;
