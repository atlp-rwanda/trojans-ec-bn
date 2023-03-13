import { Router } from "express";
import OrderController from "../../controllers/OrderController";
import extractToken from "../../middlewares/extractToken";
import checkRole from "../../middlewares/checkRole";
import isPasswordExpired from "../../middlewares/isPasswordExpired";
import isOrderExist from "../../middlewares/checkOrderExist";
import validateOrder from "../../middlewares/changeOrder";

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
  isOrderExist,
  OrderController.singleOrder
);
route.patch(
  "/:id",
  extractToken,
  isPasswordExpired,
  checkRole(["admin"]),
  isOrderExist,
  validateOrder,
  OrderController.updateOrderStatus
);
export default route;
