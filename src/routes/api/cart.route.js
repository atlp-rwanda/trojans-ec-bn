import { Router } from "express";
import CartController from "../../controllers/CartController";
import extractToken from "../../middlewares/extractToken";
import checkRole from "../../middlewares/checkRole";
import isPasswordExpired from "../../middlewares/isPasswordExpired";
import { IsProductExist } from "../../middlewares/checkProductExist";
import productAvailable from "../../middlewares/productAvailable";

const route = Router();

route.post(
  "/:id",
  extractToken,
  isPasswordExpired,
  checkRole(["buyer"]),
  IsProductExist,
  productAvailable,
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
