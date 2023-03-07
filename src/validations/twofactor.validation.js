import Joi from "joi";

const twoFactorSChema = Joi.object({
  token: Joi.number().required().min(10000).max(99999),
});

const validateToken = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const validToken = validateToken(twoFactorSChema);

export const tokenValidation = (req, res, next) => {
  try {
    const { error } = validToken(req.body);
    if (error) {
      // console.log(error);
      return res.status(400).json({
        status: 400,
        error: error.details.map((detail) =>
          detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
        ),
      });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "internal server error" });
  }
};
