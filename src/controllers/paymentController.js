/* eslint-disable no-else-return, require-jsdoc */

import PaymentService from "../services/paymentService";

class PaymentController {
  static async createPaymentCheckout(req, res) {
    await PaymentService.createPaymentCheckout(req, res);
  }

  static async paymentSuccess(req, res) {
    const result = await PaymentService.paymentSuccess(req, res);
    res.json({ message: result });
  }

  static async paymentCancel(req, res) {
    res.json({ message: "canceled" });
  }
}

export default PaymentController;
