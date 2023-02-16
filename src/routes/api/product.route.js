import { Router } from "express";
import ProductController from "../../controllers/productController";
import checkRole from "../../middlewares/checkRole";
import extractToken from "../../middlewares/extractToken";
import { validateProduct } from "../../validations/product.validation";
import upload from "../../config/multer";
import checkOwner from "../../middlewares/checkOwner";
import ProductWishesController from "../../controllers/productWishesController";
import IsProductExist from "../../middlewares/checkProductExist";
import validationOfQueries from "../../validations/query.validation";
import isPasswordExpired from "../../middlewares/isPasswordExpired";

const route = Router();

route.post(
  "/",
  extractToken,
  isPasswordExpired,
  checkRole(["seller"]),
  upload.array("image"),
  validateProduct,
  ProductController.addItem
);
route.get("/", extractToken, isPasswordExpired, ProductController.getAllItems);

route.get("/search", validationOfQueries, ProductController.searchItem);

route.get(
  "/",
  extractToken,
  isPasswordExpired,
  checkRole(["admin", "seller", "buyer"]),
  ProductController.getAllItems
);
route.get(
  "/:id",
  extractToken,
  isPasswordExpired,
  ProductController.getSingleItem
);
route.get(
  "/:id/productWishes",
  extractToken,
  isPasswordExpired,
  checkRole(["admin"]),
  IsProductExist,
  ProductWishesController.getWishProductByProduct
);
route.patch(
  "/:id",
  extractToken,
  isPasswordExpired,
  checkRole(["seller"]),
  checkOwner,
  ProductController.markAvailable
);
route.delete(
  "/:id",
  extractToken,
  isPasswordExpired,
  checkRole(["seller"]),
  checkOwner,
  ProductController.deleteItem
);
route.put(
  "/:id",
  extractToken,
  isPasswordExpired,
  checkRole(["seller"]),
  upload.array("image"),
  validateProduct,
  checkOwner,
  ProductController.updateItem
);
route.patch(
  "/:id/expired",
  extractToken,
  isPasswordExpired,
  checkRole(["admin"]),
  ProductController.productExpired
);

export default route;
