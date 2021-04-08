const Joi = require("joi");
// const JoiPhoneNumber = require("joi-phone-number-extensions")
const { HttpCode } = require("../helpers/constants");
// const Joi = BaseJoi.extend(JoiPhoneNumber);

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(33).required(),
  phone: Joi.number().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
});
const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(33).optional(),
  phone: Joi.number().required(),
  // phone: Joi.phoneNumber().defaultRegion("UA").type("MOBILE").format('E164').required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional(),
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
