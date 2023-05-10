/* eslint-disable require-jsdoc */
import CartServices from "../services/CartServices";

class CartController {
  static async addItem(req, res) {
    try {
      const resp = await CartServices.addItem(req);
      if (resp === "Out of stock") {
        return res.status(400).json({
          status: 400,
          message: "Sorry! This product is out of stock",
        });
      }
      if (resp === "not found") {
        return res.status(400).json({
          status: 400,
          message:
            "Oops! This product temporarily unavalable or It has been expired",
        });
      }
      return res.status(201).json({ status: 201, message: "added to Cart" });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ status: 500, message: error });
    }
  }

  static async getCartItems(req, res) {
    try {
      const cart = await CartServices.getCartItems(req.user);
      return res.status(200).json({ status: 200, cart });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ status: 500, message: error });
    }
  }

  static async updateCart(req, res) {
    try {
      const result = await CartServices.updateCart(req);
      if (result === "Out of stock") {
        return res.status(400).json({
          status: 400,
          message: "Sorry! This product is out of stock",
        });
      }
      if (result.message) {
        return res.status(400).json({ status: 400, message: result.message });
      }
      return res.status(200).json({ status: 200, message: "Cart updated" });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ status: 500, message: error });
    }
  }

  static async clearCart(req, res) {
    try {
      await CartServices.clearCart(req.user);
      return res
        .status(200)
        .json({ status: 200, message: "Cart cleared successfully" });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ status: 500, message: error });
    }
  }
}

export default CartController;
