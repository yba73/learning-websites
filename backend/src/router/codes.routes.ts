import { createCode } from "../controllers/codes.controllers";
import isAdmin from "../middlewares/isAdmin";
import { validateObjectId } from "../middlewares/validate.object.id";

import authMiddleware from "./../middlewares/auth.middleware";
import { Router } from "express";

export const CodesRoutes: Router = Router();
