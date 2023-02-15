import { Router } from "express";
import extractToken from "../../middlewares/extractToken";
import checkRole from "../../middlewares/checkRole";
import ProductWishesController from "../../controllers/productWishesController";
import IsProductExist from "../../middlewares/checkProductExist";

const route = Router();

route.post(
  "/",
  extractToken,
  checkRole(["buyer"]),
  IsProductExist,
  ProductWishesController.addToProductWishes
);
route.get(
  "/",
  extractToken,
  checkRole(["buyer"]),

  ProductWishesController.getProductWishes
);

export default route;
