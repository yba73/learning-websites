import { Login, Roles } from "./../interfaces/auth.interface";
import mongoose from "mongoose";

import { string } from "joi";
import { generateToken } from "./../utils/generate.token";
import { ErrorResponse } from "./../interfaces/error.interface";
import { ErrorRequestHandler, Request, Response } from "express";
import {
  DecodedToken,
  RegisterResponse,
  User,
  UserithId,
  VerfiedAccount,
  VerifyForgotPasswordUrl,
  userId,
} from "../interfaces/auth.interface";
import {
  valdiateEmail,
  valdiateLogin,
  valdiatePassword,
  valdiateRegister,
} from "../utils/schemas/users.shema";

import bcrypt from "bcryptjs";
import Users from "../models/users.model";
import sendMail from "../utils/send.email";
import { ObjectId, SuccessResponse } from "../interfaces/global.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Email } from "../interfaces/email.interface";
import Offers from "../models/offers.model";
import { sendCodetOffersResponse } from "../interfaces/offers.interface";
/**
 * @desc create new user
 * @params POST /api/v1/auth/register
 * @access PUBLIC
 **/
export const register = async (
  req: Request<{}, {}, User>,
  res: Response<RegisterResponse | ErrorResponse>
) => {
  try {
    const { email, username, password, role, offerId }: User = req.body;
    const { error } = valdiateRegister(req.body);

    if (error)
      return res
        .status(400)
        .json({ status: "fail", message: error.details[0].message });
    const existUser = await Users.findOne({ email });
    if (existUser)
      return res.status(400).json({
        status: "fail",
        message: `User with given email already Exist!`,
      });
    console.log("offerId", offerId);

    if (!mongoose.Types.ObjectId.isValid(offerId as ObjectId))
      return res
        .status(400)
        .json({ status: "fail", message: "invalid object id" });
    const offer = await Offers.findById(offerId);
    if (!offer)
      return res
        .status(400)
        .json({ status: "fail", message: "invalid offer id" });

    // crypt password
    let salt = bcrypt.genSaltSync(10); // alg of crypt
    let hash = bcrypt.hashSync(password, salt);
    const checkRole = role ? role : offer.pack;
    // push new user to document of users in database
    const newUser: User = await Users.create({
      username,
      email,
      password: hash,
      role: checkRole,
      offerId,
    });

    const token = await generateToken(newUser._id as ObjectId, role, "30m");

    const message: string = `Please click the activation link we sent to your email`;
    const link: string = `${process.env.BASE_URL_FRONT}/auth/verified-account/${newUser._id}/${token}/`;

    const subject: string = "verified account";
    await sendMail(email, subject, message, link);
    return res.status(201).json({
      status: "success",
      message: "Please click the activation link we sent to your email",
      data: {
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "something wrong" });
    throw new Error(`error register new user is ${error}`);
  }
};

/**
 * @desc verfied Account
 * @params GET /api/v1/auth/register/verified-account/:id/:token
 * @access PRIVTE (owenr of this account)
 **/

export const verfiedAccount = async (
  req: Request,
  res: Response<ErrorResponse | RegisterResponse>
) => {
  try {
    const { token, id } = req.params;

    const existUser: User | null = await Users.findById(id);
    if (!existUser)
      return res.status(400).send({ status: "fail", message: "Invalid link" });

    // validate token
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      async (error, result) => {
        if (error)
          return res.status(400).json({
            status: "fail",
            message: `${error.message}`,
          });
        else {
          const userId: ObjectId = (result as DecodedToken).id;
          const role: Roles = (result as DecodedToken).role;

          const checkOner: boolean = userId.toString() === id;
          if (!checkOner)
            return res.status(401).json({
              status: "fail",
              message: "you are not owwner of this account",
            });
          await Users.findByIdAndUpdate(id, {
            isVerified: true,
          });
          const newToken = await generateToken(userId, role, "30 d");
          return res.status(200).json({
            status: "success",
            message: "Email verified successfully",
            data: {
              token: newToken,
            },
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
    throw new Error(`error verfied account ${error}`);
  }
};

/**
 * @desc forgot password
 * @params POST /api/v1/auth/forgot-password/
 * @access PRIVTE (owenr of this account)
 **/

export const sendforgotPassword = async (
  req: Request<{}, {}, string | { email: string }>,
  res: Response<SuccessResponse | ErrorResponse>
) => {
  try {
    const { email }: { email: string } = req.body as { email: string };
    const { error } = valdiateEmail(req.body as string);

    if (error)
      return res
        .status(400)
        .json({ status: "fail", message: error.details[0].message });

    const token: string = req.headers.authorization as string;

    const existUser: User | null = await Users.findOne({ email });
    if (!existUser) {
      return res
        .status(404)
        .json({ status: "fail", message: "user not found, invalid email" });
    }

    const subject: string = "Forgot password";
    const message: string =
      "Click the link in the email to create a new password";

    const link = `${process.env.BBASE_URL_FRONT}/auth/password-reset/${existUser._id}/${token}/`;
    await sendMail(email, subject, message, link);
    return res.status(200).json({
      status: "sucess",
      message: "Password reset link sent to your email account",
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
    throw new Error(`error verfied account ${error}`);
  }
};

/**
 * @desc verify password reset link
 * @params GET /api/v1/auth/password-reset/:id/:token
 * @access PRIVTE (owenr of this account)
 **/

export const verifyForgotPasswordUrl = async (
  // req.params work with type
  // empty object for
  req: Request<VerifyForgotPasswordUrl, {}, {}, {}>,
  res: Response<SuccessResponse | ErrorResponse>
) => {
  try {
    const { id, token } = req.params;

    const user = await Users.findById(id);
    if (!user)
      return res.status(400).send({ status: "fail", message: "Invalid link" });

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      async (error, result) => {
        if (error)
          return res.status(400).json({
            status: "fail",
            message: `${error.message}`,
          });
        else {
          const userId: ObjectId = (result as DecodedToken).id;
          const checkOner: boolean = userId.toString() === id;
          if (!checkOner)
            return res.status(401).json({
              status: "fail",
              message: "you are not owwner of this account",
            });

          return res.status(200).json({
            status: "success",
            message: "valid Url",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
    throw new Error(`error verfied account ${error}`);
  }
};

/**
 * @desc create new password
 * @params POST /api/v1/auth/password-reset/:id/
 * @access PRIVTE (owenr of this account)
 **/

export const createNewPassword = async (
  // req.params , res.body, req.body, req.query
  // rq : work with type req.parmas !!
  req: Request<userId, {}, { password: string } | string>,
  res: Response<SuccessResponse | ErrorResponse>
) => {
  try {
    const { id } = req.params;
    const { password } = req.body as { password: string };

    const existUser = await Users.findById(id);
    if (!existUser)
      return res
        .status(404)
        .json({ status: "fail", message: "invalid id, user not found" });

    const { error } = valdiatePassword(req.body as string);
    if (error)
      return res
        .status(400)
        .json({ status: "fail", message: error.details[0].message });

    const checkOwener = id === req.userId.toString();
    if (!checkOwener)
      return res
        .status(401)
        .json({ status: "fail", message: "you are not owner of this account" });
    // crypt password
    let salt = bcrypt.genSaltSync(10); // alg of crypt
    let hash = bcrypt.hashSync(password, salt);

    await Users.findByIdAndUpdate(id, { password: hash });

    return res
      .status(200)
      .json({ status: "success", message: "Password reset successfully" });
  } catch (error) {}
};
/**
 * @desc logon  user
 * @params POST /api/v1/auth/login
 * @access PUBLIC
 **/
export const login = async (
  req: Request<{}, {}, Login>,
  res: Response<RegisterResponse | ErrorResponse>
) => {
  try {
    const { error } = valdiateLogin(req.body);
    if (error)
      return res
        .status(400)
        .json({ status: "fail", message: error.details[0].message });

    const { email, password } = req.body;

    const existUser: User | null = await Users.findOne({ email });
    if (!existUser)
      return res.status(404).json({
        status: "fail",
        message: "user not found, you should register frist",
      });
    const validPassword = await bcrypt.compare(password, existUser.password);
    if (!validPassword)
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid Email or Password" });

    const token = req.headers.authorization;
    if (!token)
      return res.status(400).json({ status: "fail", message: "no token" });
    if (!existUser.isVerified) {
      const url: string = `${process.env.BASE_URL_FRONT}/auth/verified-account/${existUser._id}/${token}`;
      const message: string =
        "Click the link in the email to verified your account";
      await sendMail(email, "verify Email", message, url);
    }
    const newToken = await generateToken(existUser.id, existUser.role, "360 d");

    return res.status(200).json({
      status: "sucess",
      message: "user logged in success",
      data: { token: newToken },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
    throw new Error(`error login user is ${error}`);
  }

  // throw new Error("Please add all fields");
};

/**
 * @desc logon  user
 * @params POST /api/v1/auth/login
 * @access PUBLIC
 **/
export const sendActivationCode = async (
  req: Request<{}, {}, { code: number }>,
  res: Response<sendCodetOffersResponse | ErrorResponse>
) => {
  try {
    const { code } = req.body as { code: number };
    const offer = await Offers.findOne({ code });
    if (!offer)
      return res.status(404).json({ message: "invalid code", status: "fail" });
    req.offerCode = code;
    return res
      .status(200)
      .json({ message: "valide code", status: "success", offerId: offer._id });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
    throw new Error(`error login user is ${error}`);
  }

  // throw new Error("Please add all fields");
};
