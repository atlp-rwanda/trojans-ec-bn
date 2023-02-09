/* eslint-disable require-jsdoc */
import Joi from "joi";
import PasswordComplexity from "joi-password-complexity";

const validateForm = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const updatePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: new PasswordComplexity({
    min: 8,
    max: 15,
    lowerCase: 1,
    numeric: 1,
  }),
  confirmPassword: Joi.string().required(),
});

const validatePassword = validateForm(updatePasswordSchema);

const passwordValidation = (req, res, next) => {
  const { newPassword, confirmPassword } = req.body;
  const { error } = validatePassword(req.body);
  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details.map(
        (detail) => detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
        // eslint-disable-next-line comma-dangle
      ),
    });
  } else if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .json({ status: 400, message: "Confirm password did not match" });
  } else {
    next();
  }
};

export default passwordValidation;
