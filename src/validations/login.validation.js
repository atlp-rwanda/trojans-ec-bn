/* eslint-disable require-jsdoc */
import Joi from "joi";

const userSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});
const userVald = async (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details.map(
        (detail) => detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
        // eslint-disable-next-line comma-dangle
      ),
    });
  }
  next();
};
export default userVald;
