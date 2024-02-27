import express, { Express, Response, Request } from "express";

import cors from "cors";
// import nodemailer from "nodemailer";

import { authRoutes } from "./router/auth.routes";

import coonectDB from "./config/connectDB";
import { ErrorResponse } from "./interfaces/error.interface";
import { adminRoutes } from "./router/admin.routes";
coonectDB();
require("dotenv").config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/admin", adminRoutes);

app.use("*", (req: Request, res: Response<ErrorResponse>) => {
  return res.status(404).json({ status: "fail", message: "page nout found" });
});

app.listen(process.env.PORT, () => {
  console.log(`server is run on port ${process.env.PORT}`);
});
