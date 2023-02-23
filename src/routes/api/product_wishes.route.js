import { Router } from "express";
import extractToken from "../../middlewares/extractToken";
import checkRole from "../../middlewares/checkRole";
import ProductWishesController from "../../controllers/productWishesController";
import IsProductExist from "../../middlewares/checkProductExist";
import isPasswordExpired from "../../middlewares/isPasswordExpired";

const route = Router();

route.post(
  "/",
  extractToken,
  isPasswordExpired,
  checkRole(["buyer"]),
  IsProductExist,
  ProductWishesController.addToProductWishes
);
route.get(
  "/",
  extractToken,
  isPasswordExpired,
  checkRole(["buyer"]),
  ProductWishesController.getProductWishes
);

export default route;
