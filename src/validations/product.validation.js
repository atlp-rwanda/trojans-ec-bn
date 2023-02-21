import Joi from "joi";

const { Category } = require("../database/models");

const validateForm = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const productSchema = Joi.object({
  price: Joi.number().required(),
  categoryId: Joi.number().required(),
  name: Joi.string().required(),
  quantity: Joi.number().required(),
  expiryDate: Joi.date().allow(""),
  bonus: Joi.number().required(),
  image: Joi.array().min(4).max(8).items(Joi.object()).required(),
});
const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const productValidation = validateForm(productSchema);
const categoryValidation = validateForm(categorySchema);

const validateCategory = async (req, res, next) => {
  const { error } = categoryValidation(req.body);
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
const validateProduct = async (req, res, next) => {
  const { name, price, bonus, expiryDate, categoryId, quantity } = req.body;
  const data = {
    price,
    bonus,
    name,
    expiryDate,
    quantity,
    categoryId,
    image: req.files,
  };
  const { error } = productValidation(data);
  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details.map(
        (detail) => detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
        // eslint-disable-next-line comma-dangle
      ),
    });
  } else {
    const cat = await Category.findOne({ where: { id: categoryId } });
    if (cat) {
      next();
    } else {
      return res
        .status(400)
        .json({ status: 400, error: "Category doesn't exist" });
    }
  }
};
export { validateProduct, validateCategory };
