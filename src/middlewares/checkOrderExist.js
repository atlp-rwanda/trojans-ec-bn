/* eslint-disable require-jsdoc */
import { Order } from "../database/models";

export default async function isOrderExist(req, res, next) {
  try {
    const orderId = req.params.id;
    const order = await Order.findOne({ where: { id: orderId } });
    if (!order) {
      return res.status(400).json({
        status: 400,
        message: "No such order found!",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}
