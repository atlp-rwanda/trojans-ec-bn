/* eslint-disable require-jsdoc */
/* eslint-disable no-else-return */

import JwtUtil from "../utils/generateToken";

const stripe = require("stripe")(`${process.env.STRIPE_KEY}`);

const { Cart, Order, Product, Sales } = require("../database/models");

class PaymentService {
  static async createPaymentCheckout(req, res) {
    const appUrl = `${req.protocol}://${req.headers.host}`;
    const token = JwtUtil.generate(req.user);

    try {
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
      res.status(200).json({ token, paymentId: session.id, url: session.url });
    } catch (error) {
      /* istanbul ignore next */
      res.status(500).json({ error });
    }
  }

  static async paymentSuccess(req, res) {
    try {
      /* istanbul ignore next */
      const { token, paymentId } = req.query;
      const user = JwtUtil.verify(token).data;
      const cart = await Cart.findOne({ where: { buyerId: user.id } });
      const session = await stripe.checkout.sessions.retrieve(paymentId);
      if (session.payment_status === "paid") {
        /* istanbul ignore next */
        const order = await Order.create({
          BuyerId: user.id,
          Subtotal: cart.total,
          paymentStatus: session.payment_status,
        });
        await order.save();

        cart.items.map(async (element) => {
          /* istanbul ignore next */
          const product = await Product.findOne({ where: { id: element.id } });
          const sales = await Sales.create({
            Orderid: order.id,
            Productid: element.id,
            Sellerid: product.sellerId,
            Quantity: element.quantity,
          });
          await sales.save();
        });
        await Cart.destroy({ where: { buyerId: user.id } });
        return "successfully";
      }
      return session.payment_status;
    } catch (error) {
      /* istanbul ignore next */
      res.status(500).json({ error });
    }
  }
}

export default PaymentService;
