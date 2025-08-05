import Joi from "joi";

const questionSchema = Joi.object({
  text: Joi.string().required(),
});

export default questionSchema;
