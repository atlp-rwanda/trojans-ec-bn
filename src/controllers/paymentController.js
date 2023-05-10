/* eslint-disable no-else-return, require-jsdoc */

import PaymentService from "../services/paymentService";
import "dotenv/config";

class PaymentController {
  static async createPaymentCheckout(req, res) {
    try {
      const result = await PaymentService.createPaymentCheckout(req, res);
      return res.status(200).json(result);
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ status: 500, error: error.message });
    }
  }

  static async paymentSuccess(req, res) {
    try {
     const result = await PaymentService.paymentSuccess(req, res);
     if(result.orderId){
       return res.redirect(
         `${process.env.PAYMENT_REDIRECT_URL}?message=Payment Success&&order=${result.orderId}`
       );
      }
    } catch (error) {
      /* istanbul ignore next */
      return res.redirect(
        `${process.env.PAYMENT_REDIRECT_URL}?message=Fail&&error=${error.message}`
      );
    }
  }

  static async paymentCancel(req, res) {
    try {
      return res.status(200).json({ status: 200, message: "canceled" });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
}

export default PaymentController;
