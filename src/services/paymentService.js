/* eslint-disable require-jsdoc, no-else-return */

import JwtUtil from "../utils/generateToken";
import { prodEmitter } from "./productService";

const stripe = require("stripe")(`${process.env.STRIPE_KEY}`);

const { Cart, Order, Product, Sales } = require("../database/models");

class PaymentService {
  static async createPaymentCheckout(req) {
    const appUrl = `${req.protocol}://${req.headers.host}`;
    const token = JwtUtil.generate(req.user);

    const cart = await Cart.findOne({ where: { buyerId: req.user.id } });
    const orderItems = [];
    cart.items.forEach((element) => {
      const amount = element.price * 100;
      const item = {
        price_data: {
          currency: "usd",
          product_data: {
            name: element.name,
            images: [element.image],
          },
          unit_amount: amount,
        },
        quantity: element.quantity,
      };
      orderItems.push(item);
    });
    const session = await stripe.checkout.sessions.create({
      line_items: orderItems,
      mode: "payment",
      success_url: `${appUrl}/api/v1/payment/success-callback?token=${token}&&paymentId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/api/v1/payment/cancel-callback?token=${token}`,
    });
    return { status: 200, token, paymentId: session.id, url: session.url };
  }

  /* istanbul ignore next */
  static async paymentSuccess(req) {
    const { token, paymentId } = req.query;
    const user = JwtUtil.verify(token).data;
    const cart = await Cart.findOne({ where: { buyerId: user.id } });
    const session = await stripe.checkout.sessions.retrieve(paymentId);
    if (session.payment_status === "paid") {
      const order = await Order.create({
        BuyerId: user.id,
        Subtotal: cart.total,
        items: cart.items,
        paymentStatus: session.payment_status,
      });
      const savedOrder = await order.save();

      cart.items.map(async (element) => {
        /* istanbul ignore next */
        const product = await Product.findOne({ where: { id: element.id } });
        const sales = await Sales.create({
          Orderid: order.id,
          Productid: element.id,
          Sellerid: product.sellerId,
          Quantity: element.quantity,
          Status: "pending",
        });
        await sales.save();
        await Product.update(
          { quantity: product.quantity - element.quantity },
          { where: { id: element.id } }
        );
      });
      await Cart.destroy({ where: { buyerId: user.id } });
      prodEmitter.emit("productBought", {
        buyerInfo: user,
        products: cart.items,
      });
      return { orderId: savedOrder.dataValues.id };
    }
    return { paymentStatus: session.payment_status };
  }
}

export default PaymentService;
