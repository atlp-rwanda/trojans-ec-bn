/* eslint-disable require-jsdoc */
import Joi from "joi";

const querySchema = Joi.object({
  categoryId: Joi.number(),
  price: Joi.string(),
  expiryDate: Joi.date(),
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
    } else {
      res.status(400).json({
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
