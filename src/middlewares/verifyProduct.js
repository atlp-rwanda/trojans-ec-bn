const { Category } = require("../database/models");

const verifyCategory = async (req, res, next) => {
  try {
    const exists = await Category.findOne({ where: { name: req.body.name } });
    if (exists) {
      return res
        .status(409)
        .json({ status: 409, message: "Category Already Exists" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Error in exists mid" });
  }
};
const verifyCategoryExists = async (req, res, next) => {
  const exist = await Category.findOne({ where: { name: req.body.name } });
  if (exist) {
    next();
  } else {
    res.status(400).json({ status: 400, message: "Category does not exist" });
  }
};
export { verifyCategory, verifyCategoryExists };
