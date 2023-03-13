/* eslint-disable require-jsdoc */
import { Product } from "../database/models/index";

export default async function IsProductExist(req, res, next) {
  try {
    const productId = req.params.id || req.body.product_id;
    const product = await Product.findOne({ where: { id: productId } });
    if (!product || product == null) {
      return res
        .status(404)
        .json({ status: 404, message: "product does not exist" });
    }
    req.product = product;
    next();
  } catch (error) {
    return res.status(500).json({ status: 500, error: "server error" });
  }
}
