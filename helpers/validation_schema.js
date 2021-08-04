const Joi = require("joi");

const authSchema = Joi.object({
  name: Joi.string().min(2).trim().required(),
  email: Joi.string().lowercase().trim().email().required(),
  password: Joi.string().required().min(6),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().required().min(6),
});

module.exports = {
  authSchema,
  loginSchema,
};
