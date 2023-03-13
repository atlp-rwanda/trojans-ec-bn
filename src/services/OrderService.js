/* eslint-disable require-jsdoc */
import { io } from "../utils/socketio";
import { prodEmitter } from "./productService";

const { Order, Sales } = require("../database/models");

class OrderService {
  static async getOrders(user) {
    const { id, role } = user;
    let orders;
    if (role === "buyer") {
      orders = await Order.findAll({
        where: { BuyerId: id },
        attributes: ["id", "Subtotal", "deliveredDate", "status"],
        order: ["updatedAt"],
      });
    } else if (role === "admin") {
      orders = await Order.findAll({
        attributes: ["id", "BuyerId", "deliveredDate", "status"],
        order: ["updatedAt"],
        include: [
          {
            model: Sales,
            as: "order",
            attributes: ["id", "Sellerid", "Status"],
          },
        ],
      });
    }
    return orders;
  }

  static async singleOrder(req) {
    const { id, role } = req.user;
    if (role === "buyer") {
      const order = await Order.findOne({
        where: { BuyerId: id, id: req.params.id },
        include: "order",
      });
      if (!order) {
        return "No such order belongs to you";
      }
      return order;
    }
    if (role === "admin") {
      const order = await Order.findOne({
        where: { id: req.params.id },
        include: "order",
      });
      return order;
    }
  }

  static async updateOrderStatus(req) {
    const { id } = req.params;
    const updateOrder = await Order.update(req.body, { where: { id } });
    if (updateOrder) {
      const UpdatedOrder = await Order.findOne({ where: { id } });
      io.to(`user-${UpdatedOrder.BuyerId}`).emit("orderstatus", UpdatedOrder);
      prodEmitter.emit("orderStatus", UpdatedOrder);
      return UpdatedOrder;
    }
  }
}

export default OrderService;
