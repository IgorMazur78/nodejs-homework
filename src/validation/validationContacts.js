const Joi = require("joi");
const { HttpCode } = require("../helpers/constants");

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(33).required(),
  phone: Joi.string().alphanum().min(2).max(20).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  shopCustomer: Joi.boolean().optional(),
  owner:Joi.string()
});
const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(33).optional(),
  phone: Joi.string().alphanum().min(2).max(20).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional(),
}).or("name", "phone", "email");

const schemaUpdateStatusContact = Joi.object({
  shopCustomer: Joi.boolean().required(),
});

const schemaCreateUser = Joi.object({
  name: Joi.string().alphanum().min(2).max(33).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().required(),
  subscription: Joi.string().optional(),
});
const schemaLoginUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().required(),
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;
    console.log("помилка:", error.details);

    return next({
      status: HttpCode.BAD_REQUEST,

      message: `field : ${message.replace(/"/g, "")}`,
      data: "BAD_REQUEST",
    });
  }
  next();
};
module.exports.validateSchemaCreateContact = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next);
};

module.exports.validateSchemaUpdateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
module.exports.validateSchemaUpdateStatusContact = (req, res, next) => {
  return validate(schemaUpdateStatusContact, req.body, next);
};
module.exports.validateschemaCreateUser = (req, res, next) => {
  return validate(schemaCreateUser, req.body, next);
};
module.exports.validatesschemaLoginUser = (req, res, next) => {
  return validate(schemaLoginUser, req.body, next);
};
