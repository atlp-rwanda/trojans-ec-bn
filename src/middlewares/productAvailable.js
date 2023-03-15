/* eslint-disable require-jsdoc */
import { Product } from "../database/models/index";

export default async function productAvailable(req, res, next) {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id, available: true, expired: false },
    });
    if (!product) {
      return res.status(404).json({
        status: 404,
        message: "Product is not available",
      });
    }
    next();
  } catch (error) {
    res.status(500).send({ status: 500, error: "server error" });
  }
}
