import { Router } from "express";
import OrderController from "../../controllers/OrderController";
import extractToken from "../../middlewares/extractToken";
import checkRole from "../../middlewares/checkRole";
import isPasswordExpired from "../../middlewares/isPasswordExpired";

const route = Router();

route.get(
  "/",
  extractToken,
  isPasswordExpired,
  checkRole(["admin", "buyer"]),
  OrderController.getOrders
);
route.get(
  "/:id",
  extractToken,
  isPasswordExpired,
  checkRole(["admin", "buyer"]),
  OrderController.singleOrder
);

export default route;
