import { Types, Document } from "mongoose";
import { ObjectId } from "./global.interface";
import { WithId } from "mongodb";
import { string } from "joi";
export interface User extends Document {
  email: string;
  username: string;
  password: string;
  role: Roles;
  offerId?: ObjectId;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export type UserithId = WithId<User>;
export interface DecodedToken {
  id: ObjectId;
  role: Roles;
}

export interface RegisterResponse {
  status: string;
  message: string;
  data: {
    token: string;
  };
}

export interface MailOption {
  from: string;
  to: string;
  subject: string;

  html: string;
}

export interface VerfiedAccount {
  token: string;
  id: string;
}

// wrok
export type userId = {
  id: string;
};

export type VerifyForgotPasswordUrl = {
  token: string;
  id: string;
};

export type Login = {
  email: string;
  password: string;
};
export enum Roles {
  Gold = "Gold",
  Silver = "Silver",
  Copper = "Copper",
  admin = "admin",
}
