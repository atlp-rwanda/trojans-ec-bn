import { Router } from "express";
import CartController from "../../controllers/CartController";
import extractToken from "../../middlewares/extractToken";
import checkRole from "../../middlewares/checkRole";
import isPasswordExpired from "../../middlewares/isPasswordExpired";

const route = Router();

route.post(
  "/:id",
  extractToken,
  isPasswordExpired,
  checkRole(["buyer"]),
  CartController.addItem
);
route.get(
  "/",
  extractToken,
  isPasswordExpired,
  checkRole(["buyer"]),
  CartController.getCartItems
);
route.delete(
  "/",
  extractToken,
  isPasswordExpired,
  checkRole(["buyer"]),
  CartController.clearCart
);
route.put(
  "/:id",
  extractToken,
  isPasswordExpired,
  checkRole(["buyer"]),
  CartController.updateCart
);

export default route;
