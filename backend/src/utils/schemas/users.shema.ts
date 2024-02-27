import { User } from "../../interfaces/auth.interface";
import Joi from "joi";
type Email = {
  eamil: string;
};
/*======= ValdiateRegister ========*/
export const valdiateRegister = (User: User) => {
  const schema = Joi.object({
    username: Joi.string().trim().min(3).max(100).required(),
    email: Joi.string().trim().min(4).max(100).email().required(),
    password: Joi.string().trim().min(6).required(),
    role: Joi.string().trim().valid("admin", "Gold", "Silver", "Copper"),
    offerId: Joi.string(),
  });
  return schema.validate(User);
};
/*=======// ValdiateRegister //========*/

/*======= valdiateEmail ========*/
export const valdiateEmail = (email: string) => {
  const schema = Joi.object({
    email: Joi.string().trim().min(4).max(100).email().required(),
  });
  return schema.validate(email);
};
/*=======// valdiateEmail //========*/

/*======= valdiatePassword ========*/
export const valdiatePassword = (password: string) => {
  const schema = Joi.object({
    password: Joi.string().trim().min(6).required(),
  });
  return schema.validate(password);
};
/*=======// valdiatePassword //========*/

/*======= valdiateResetPassword ========*/
export const valdiateLogin = (loginData: {
  email: string;
  password: string;
}) => {
  const schema = Joi.object({
    email: Joi.string().trim().min(4).max(100).email().required(),
    password: Joi.string().trim().min(6).required(),
  });
  return schema.validate(loginData);
};
/*=======// valdiateResetPassword //========*/
