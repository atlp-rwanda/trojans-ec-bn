/* eslint-disable require-jsdoc */
const { Order, Sales } = require("../database/models");

class OrderService {
  static async getOrders(user) {
    const { id, role } = user;
    let orders;
    if (role === "buyer") {
      orders = await Order.findAll({
        where: { BuyerId: id },
        attributes: ["id", "Subtotal", "status"],
        order: ["updatedAt"],
      });
      if (!orders) {
        return "Empty Order list";
      }
    } else if (role === "admin") {
      orders = await Order.findAll({
        attributes: ["id", "BuyerId", "status"],
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
    if (req.user.role === "buyer") {
      const order = await Order.findOne({
        where: { BuyerId: req.user.id, id: req.params.id },
        include: "order",
      });
      if (!order) {
        return "No such order found";
      }
      return order;
    }
    if (req.user.role === "admin") {
      const order = await Order.findOne({
        where: { id: req.params.id },
        include: "order",
      });
      if (!order) {
        return "No such order found";
      }
      return order;
    }
  }
}

export default OrderService;
