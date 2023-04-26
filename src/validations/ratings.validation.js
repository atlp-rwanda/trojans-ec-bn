import Joi from "joi";

const ratingsSchema = Joi.object({
  rate: Joi.number().min(1).max(5).required(),
  feedback: Joi.string().required().min(10).max(100),
});

const validateRatings = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const ratingsValidation = validateRatings(ratingsSchema);

const validationOfRatings = async (req, res, next) => {
  try {
    const { error } = ratingsValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details.map(
          (detail) => detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
          // eslint-disable-next-line comma-dangle
        ),
      });
    }
    next();
  } catch (error) {
    /* istanbul ignore next */
    return res
      .status(500)
      .json({ status: 500, message: "internal server error" });
  }
};

export default validationOfRatings;
