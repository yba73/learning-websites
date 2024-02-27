import { createChapter, getChapters } from "../controllers/chapters.controller";
import {
  checkCode,
  createCode,
  getCodes,
} from "../controllers/codes.controllers";
import { createLesson } from "../controllers/lessons.controllers";
import { createOffer, getOffers } from "../controllers/offers.conttrollers";
import isAdmin from "../middlewares/isAdmin";
import {
  validateObjectId,
  validateObjectOfferId,
} from "../middlewares/validate.object.id";
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

export const adminRoutes: Router = Router();

adminRoutes.post("/register", register);
adminRoutes.get(
  "/register/verified-account/:id/:token",
  validateObjectId,
  verfiedAccount
);

adminRoutes.post("/forgot-password", authMiddleware, sendforgotPassword);

adminRoutes.post(
  "/password-reset/:id",
  authMiddleware,
  validateObjectId,
  createNewPassword
);

adminRoutes.get(
  "/password-reset/:id/:token",
  validateObjectId,
  verifyForgotPasswordUrl
);

adminRoutes.get(
  "/password-reset/:id/:token",
  validateObjectId,
  verifyForgotPasswordUrl
);

adminRoutes.post("/login", login);
//offers
adminRoutes.post("/offers", authMiddleware, isAdmin, createOffer);
adminRoutes.get("/offers", authMiddleware, isAdmin, getOffers);

//codes
adminRoutes.get("/codes", authMiddleware, isAdmin, getCodes);

adminRoutes.post(
  "/codes/:offerId",

  authMiddleware,
  isAdmin,
  validateObjectOfferId,

  createCode
);
adminRoutes.post(
  "/codes/checkcode/:code",

  checkCode
);

//chapters
adminRoutes.post("/chapters", authMiddleware, isAdmin, createChapter);
adminRoutes.get("/chapters", getChapters);

//lessons
adminRoutes.post("/lessons/:chapterId", authMiddleware, isAdmin, createLesson);
