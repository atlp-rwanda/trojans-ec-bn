import { Router } from "express";
import ProductController from "../../controllers/productController";
import checkRole from "../../middlewares/checkRole";
import extractToken from "../../middlewares/extractToken";
import { validateProduct } from "../../validations/product.validation";
import { uploadProductImages } from "../../config/multer";
import WishListController from "../../controllers/wishListController";
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
route.get("/:id/product-wishes",
  extractToken,
  checkRole(["admin"]),
  IsProductExist,
  WishListController.getWishProductByProduct);

export default route;
