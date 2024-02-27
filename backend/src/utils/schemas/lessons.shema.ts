import { Lesson } from "./../../models/lessons.models";
import Joi from "joi";

/*======= valdiateCreateLesson ========*/
export const valdiateCreateLesson = (Lesson: Lesson) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(6).required(),
    link: Joi.string().trim().required(),
  });
  return schema.validate(Lesson);
};
/*=======// valdiateCreateLesson //========*/
