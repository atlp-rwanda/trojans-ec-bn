/* eslint-disable require-jsdoc */
import { Product } from "../database/models/index";

export default async function IsProductExist(req, res, next) {
  try {
    const productId = req.params.id || req.body.product_id
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
        return res
        .status(403)
        .json({ status: 403, message: "product is not exist" });
     
    }
    next();
  } catch (error) {
    return res.status(500).json({ status: 500, error: "server error" });
  }
}