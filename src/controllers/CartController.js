/* eslint-disable require-jsdoc */
import CartServices from "../services/CartServices";

class CartController {
  static async addItem(req, res) {
    try {
      await CartServices.addItem(req);
      res.status(201).json({ status: 201, message: "added to Cart" });
    } catch (error) {
      res.status(500).json({ status: 500, message: error });
    }
  }

  static async getCartItems(req, res) {
    try {
      const cart = await CartServices.getCartItems(req.user);
      res.status(200).json({ status: 200, cart });
    } catch (error) {
      res.status(500).json({ status: 500, message: error });
    }
  }

  static async updateCart(req, res) {
    try {
      CartServices.updateCart(req);
      res.status(200).json({ status: 200, message: "Cart updated" });
    } catch (error) {
      res.status(500).json({ status: 500, message: error });
    }
  }

  static async clearCart(req, res) {
    try {
      await CartServices.clearCart(req.user);
      res
        .status(200)
        .json({ status: 200, message: "Cart cleared successfully" });
    } catch (error) {
      res.status(500).json({ status: 500, message: error });
    }
  }
}

export default CartController;
