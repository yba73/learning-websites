import { Chapter } from "./../../models/chapters.model";
import { Lesson } from "./../../models/lessons.models";
import Joi from "joi";

/*======= valdiateCreateChapter ========*/
export const valdiateCreateChapter = (Chapter: Chapter) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(6).required(),
    level: Joi.string()
      .trim()
      .valid("7th grade", "8th grade", "9th grade")
      .required(),
  });
  return schema.validate(Chapter);
};
/*=======// valdiateCreateChapter //========*/
