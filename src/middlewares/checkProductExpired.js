/* eslint-disable require-jsdoc */
import { Product } from "../database/models";

export default async function IsPorductExpired(req, res, next) {
  try {
    const prodId = req.params.id;
    const product = await Product.findOne({ where: { id: prodId } });
    if (product.expired === true) {
      return res.status(409).json({
        status: 409,
        message: "Product already expired",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Server Error" });
  }
}
