/* eslint-disable no-else-return, require-jsdoc */

import PaymentService from "../services/paymentService";

class PaymentController {
  static async createPaymentCheckout(req, res) {
    try {
      await PaymentService.createPaymentCheckout(req, res);
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ status: 500, error: error.message });
    }
  }

  static async paymentSuccess(req, res) {
    try {
      const result = await PaymentService.paymentSuccess(req, res);
      res.json({ message: result });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ status: 500, error: error.message });
    }
  }

  static async paymentCancel(req, res) {
    try {
      res.json({ message: "canceled" });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
}

export default PaymentController;
