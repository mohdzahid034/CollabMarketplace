
import Joi from "joi";

const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development"),

  PORT: Joi.number()
    .port()
    .default(5000),

  MONGODB_URI: Joi.string()
    .required()
}).unknown();

const { error, value } = envSchema.validate(process.env, {
  abortEarly: false,
  convert: true
});

if (error) {
  throw new Error(
    `Environment validation failed: ${error.message}`
  );
}

const env = {
  NODE_ENV: value.NODE_ENV as string,
  PORT: value.PORT as number,
  MONGODB_URI: value.MONGODB_URI as string
};

export default env;
