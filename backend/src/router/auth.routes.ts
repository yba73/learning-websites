import { validateObjectId } from "../middlewares/validate.object.id";
import {
  login,
  verfiedAccount,
  register,
  sendforgotPassword,
  verifyForgotPasswordUrl,
  createNewPassword,
} from "./../controllers/auth.controllers";
import authMiddleware from "./../middlewares/auth.middleware";
import { Router } from "express";

export const authRoutes: Router = Router();

authRoutes.post("/register", register);
authRoutes.get(
  "/register/verified-account/:id/:token",
  validateObjectId,
  verfiedAccount
);

authRoutes.post("/forgot-password", authMiddleware, sendforgotPassword);
authRoutes.get(
  "/password-reset/:id/:token",
  validateObjectId,
  verifyForgotPasswordUrl
);

authRoutes.get(
  "/password-reset/:id/:token",
  validateObjectId,
  verifyForgotPasswordUrl
);

authRoutes.post(
  "/password-reset/:id",
  authMiddleware,
  validateObjectId,
  createNewPassword
);
authRoutes.post("/login", login);
