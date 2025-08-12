import Joi from "joi";

const answerSchema = Joi.object({
  answerText: Joi.string().required(),
});

export default answerSchema;
