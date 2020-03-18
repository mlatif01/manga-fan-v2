const Joi = require('@hapi/joi');

// Register Validation
const registerValidation = data => {
  const schema = Joi.object({
    username: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data);
};

// Login Validation
const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data);
};

// Manga Validation
const mangaValidation = data => {
  const schema = Joi.object({
    author: Joi.string()
      .min(1)
      .max(255)
      .required(),
    title: Joi.string()
      .min(1)
      .max(255)
      .required(),
    releaseYear: Joi.number()
      .min(1900)
      .max(3000)
      .required(),
    latestChapter: Joi.number()
      .max(99999)
      .required(),
    lastRead: Joi.number()
      .max(99999)
      .required()
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.mangaValidation = mangaValidation;
