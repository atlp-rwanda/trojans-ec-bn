import Joi from "joi";

const userSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});
const userVald = async (req, res, next) => {
  const { error, value } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  next();
};
export default userVald;
