import { Router } from "express";
import ProductController from "../../controllers/productController";
import checkRole from "../../middlewares/checkRole";
import extractToken from "../../middlewares/extractToken";
import { validateProduct } from "../../validations/product.validation";
import { uploadProductImages } from "../../config/multer";
import checkOwner from "../../middlewares/checkOwner";
import ProductWishesController from "../../controllers/productWishesController";
import IsProductExist from "../../middlewares/checkProductExist";
import validationOfQueries from "../../validations/query.validation";

const route = Router();

route.post(
  "/",
  uploadProductImages.array("image"),
  extractToken,
  checkRole(["seller"]),
  validateProduct,
  ProductController.addItem
);
route.get("/", extractToken, ProductController.getAllItems);

route.get("/search", validationOfQueries, ProductController.searchItem);

route.get("/:id", extractToken, ProductController.getSingleItem);
route.get(
  "/:id/productWishes",
  extractToken,
  checkRole(["admin"]),
  IsProductExist,
  ProductWishesController.getWishProductByProduct,
);
route.patch(
  "/:id",
  extractToken,
  checkRole(["seller"]),
  checkOwner,
  ProductController.markAvailable,
);
route.delete(
  "/:id",
  extractToken,
  checkRole(["seller"]),
  checkOwner,
  ProductController.deleteItem,
);
route.put(
  "/:id",
  uploadProductImages.array("image"),
  extractToken,
  checkRole(["seller"]),
  validateProduct,
  checkOwner,
  ProductController.updateItem,
);

export default route;
