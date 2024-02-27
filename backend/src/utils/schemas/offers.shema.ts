import Joi from "joi";
import { Offer } from "../../interfaces/offers.interface";

/*======= valdiateCreateOffer ========*/
export const valdiateCreateOffer = (Offer: Offer) => {
  const schema = Joi.object({
    level: Joi.string()
      .trim()
      .valid("7th grade", "8th grade", "9th grade")
      .required(),
    duration: Joi.string().trim().valid("365d", "183d").required(),
    pack: Joi.string().trim().valid("Gold", "Silver", "Copper").required(),
    price: Joi.number().required(),
  });
  return schema.validate(Offer);
};
/*=======// valdiateCreateOffer //========*/
