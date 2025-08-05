import Joi from "joi";

const answerSchema = Joi.object({
  text: Joi.string().required(),
});

export default answerSchema;
