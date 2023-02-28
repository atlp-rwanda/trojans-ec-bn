import express from "express";
import extractToken from "../../middlewares/extractToken";
import checkRole from "../../middlewares/checkRole";
import PaymentController from "../../controllers/paymentController";
import IsUserHasCart from "../../middlewares/checkUserCartExist";

const route = express.Router();

route.post(
  "/checkout",
  extractToken,
  checkRole(["buyer"]),
  IsUserHasCart,
  PaymentController.createPaymentCheckout
);
route.get("/success-callback", PaymentController.paymentSuccess);
route.get("/cancel-callback", PaymentController.paymentCancel);

export default route;
