import { Router } from "express";
import ProductController from "../../controllers/productController";
import checkAdmin from "../../middlewares/checkAdmin";
import extractToken from "../../middlewares/extractToken";
import {
  verifyCategory,
  verifyCategoryExists,
} from "../../middlewares/verifyProduct";
import { validateCategory } from "../../validations/product.validation";

const route = Router();

route.post(
  "/",
  extractToken,
  checkAdmin,
  validateCategory,
  verifyCategory,
  ProductController.addCategory
);
route.get("/", ProductController.viewCategories);
route.delete(
  "/",
  extractToken,
  checkAdmin,
  validateCategory,
  verifyCategoryExists,
  ProductController.deleteCategory
);
export default route;
