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
      return res.status(200).json({ status: 200, response });
    } catch (err) {
      return res.status(500).json({ status: 500, message: err.message });
    }
  }

  static async updateOrderStatus(req, res) {
    try {
      const UpdatedOrder = await OrderService.updateOrderStatus(req);
      return res.status(200).json({
        status: 200,
        Order: UpdatedOrder,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error });
    }
  }
}

export default OrderController;
