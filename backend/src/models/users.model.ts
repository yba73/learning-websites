import mongoose from "mongoose";
import { User } from "../interfaces/auth.interface";
const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, required: true, default: false },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
      required: true,
    },
    offerId: {
      type: mongoose.Types.ObjectId,
      ref: "offer",
    },
  },
  { timestamps: true }
);

const Users = mongoose.model<User>("user", userSchema);
export default Users;
