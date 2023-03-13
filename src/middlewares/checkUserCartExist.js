/* eslint-disable require-jsdoc */
import { Cart } from "../database/models/index";

export default async function IsUserHasCart(req, res, next) {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ where: { buyerId: userId } });
    if (!cart) {
      return res
        .status(404)
        .json({ status: 404, message: "add product(s) to cart first" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ status: 500, error: "server error" });
  }
}
