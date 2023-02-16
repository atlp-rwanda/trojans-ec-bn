import { Router } from "express";
import ProductController from "../../controllers/productController";
import checkRole from "../../middlewares/checkRole";
import extractToken from "../../middlewares/extractToken";
import { validateProduct } from "../../validations/product.validation";
import { uploadProductImages } from "../../config/multer";
import ProductWishesController from "../../controllers/productWishesController";
import IsProductExist from "../../middlewares/checkProductExist";

const route = Router();

route.post(
  "/",
  uploadProductImages.array("image"),
  extractToken,
  checkRole(["seller"]),
  validateProduct,
  ProductController.addItem
);
route.get(
  "/",
  extractToken,
  checkRole(["admin", "seller", "buyer"]),
  ProductController.getAllItems
);
route.get("/:id", extractToken, ProductController.getSingleItem);
route.get("/:id/productWishes",
  extractToken,
  checkRole(["admin"]),
  IsProductExist,
  ProductWishesController.getWishProductByProduct);

export default route;
