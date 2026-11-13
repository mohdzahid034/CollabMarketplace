import Joi from "joi";

const testValidation = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required(),

  email: Joi.string()
    .trim()
    .email()
    .required(),

  age: Joi.number()
    .integer()
    .min(18)
    .max(100)
    .required()
});

export default testValidation;