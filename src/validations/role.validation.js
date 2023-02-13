
/* eslint-disable require-jsdoc */
import Joi from "joi";

const { User } = require("../database/models");

const roleSchema = Joi.object({
  role: Joi.string().valid("seller", "admin", "buyer"),
});

const validateRole = async (req, res, next) => {
  const { error } = roleSchema.validate(req.body, { abortEarly: false });
  const user = await User.findOne({ where: { id: req.params.id } });
  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details.map(
        (detail) => detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
        // eslint-disable-next-line comma-dangle
      ),
    });
  }
  if (user.role === req.body.role) {
    return res.status(409).json({
      status: 409,
      message: "Role already assigned",
    });
  }
  next();
};
export default validateRole;


