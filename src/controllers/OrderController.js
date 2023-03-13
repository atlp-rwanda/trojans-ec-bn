/* eslint-disable require-jsdoc */
import OrderService from "../services/OrderService";

class OrderController {
  static async getOrders(req, res) {
    try {
      const response = await OrderService.getOrders(req.user);
      res.status(200).json({ status: 200, response });
    } catch (err) {
      res.status(500).json({ status: 500, message: err });
    }
  }

  static async singleOrder(req, res) {
    try {
      const response = await OrderService.singleOrder(req);
      res.status(200).json({ status: 200, response });
    } catch (err) {
      res.status(500).json({ status: 500, message: err });
    }
  }
}

export default OrderController;
