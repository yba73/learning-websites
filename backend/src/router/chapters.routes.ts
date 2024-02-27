import { createChapter } from "../controllers/chapters.controller";
import isAdmin from "../middlewares/isAdmin";
import { validateObjectId } from "../middlewares/validate.object.id";

import authMiddleware from "./../middlewares/auth.middleware";
import { Router } from "express";

export const ChaptersRoutes: Router = Router();

ChaptersRoutes.post("/", authMiddleware, isAdmin, createChapter);
