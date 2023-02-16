import { Router } from "express";
import ProductController from "../../controllers/productController";
import checkRole from "../../middlewares/checkRole";
import extractToken from "../../middlewares/extractToken";
import { validateProduct } from "../../validations/product.validation";
import { uploadProductImages } from "../../config/multer";

const route = Router();

route.post(
  "/",
  uploadProductImages.array("image"),
  extractToken,
  checkRole(["seller"]),
  validateProduct,
  ProductController.addItem
);

export default route;
