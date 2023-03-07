/* eslint-disable no-else-return */
/* eslint-disable require-jsdoc */
import Joi from "joi";

const querySchema = Joi.object({
  categoryId: Joi.number(),
  price: Joi.string()
    .regex(/^\d+-\d+$/)
    .messages({
      "string.pattern.base": "Price must be in the format of Number",
    }),
  expiryDate: Joi.date().greater("now"),
  sellerId: Joi.number(),
  product: Joi.string(),
});

const validateQueries = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const QueriesValidation = validateQueries(querySchema);

const validationOfQueries = async (req, res, next) => {
  try {
    const { categoryId, price, expiryDate, sellerId, product } = req.query;
    if (categoryId || price || expiryDate || sellerId || product) {
      const { error } = QueriesValidation(req.query);
      if (error) {
        // console.log(price)
        return res.status(400).json({
          status: 400,
          error: error.details.map(
            (detail) => detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
            // eslint-disable-next-line comma-dangle
          ),
        });
      } else {
        next();
      }
    } else {
      return res.status(400).json({
        status: 400,
        message: "you need to provide at least one search parameter",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "internal server error" });
  }
};

export default validationOfQueries;
