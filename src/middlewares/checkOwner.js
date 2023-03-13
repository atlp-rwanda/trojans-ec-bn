import { Product } from "../database/models";

const checkOwner = async (req, res, next) => {
  const product = await Product.findOne({ where: { id: req.params.id } });
  if (req.user.id === product.sellerId) {
    req.product = product;
    next();
  } else {
    res.status(401).json({ message: "You're not an owner of this product!" });
  }
};
export default checkOwner;
