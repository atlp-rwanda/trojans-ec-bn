/* eslint-disable require-jsdoc */
import Joi from "joi";
import PasswordComplexity from "joi-password-complexity";

const validateForm = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const signUpSchema = Joi.object({
  name: Joi.string().min(1).trim().required(),
  email: Joi.string().email().trim().required(),
  password: new PasswordComplexity({
    min: 8,
    max: 15,
    lowerCase: 1,
    numeric: 1,
  }).required(),
  gender: Joi.string()
    .min(4)
    .trim()
    .required()
    .valid("Male", "Female")
    .messages({ "any.only": "gender must be  Male or Female" }),
  birthdate: Joi.date().required().less("now"),
  preferredLanguage: Joi.string().min(2).trim().required(),
  preferredCurrency: Joi.string().min(1).trim().required(),
  street: Joi.string().min(3).trim().required(),
  country: Joi.string().min(3).trim().required(),
  postalCode: Joi.string().min(5).trim().required(),
  city: Joi.string().min(3).trim().required(),
  province: Joi.string().min(3).trim().required(),
});

const validatesignUp = validateForm(signUpSchema);

const signupValidation = (req, res, next) => {
  const { error } = validatesignUp(req.body);
  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details.map(
        (detail) => detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
        // eslint-disable-next-line comma-dangle
      ),
    });
  } else {
    next();
  }
};

export default signupValidation;
