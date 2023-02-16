import { Router } from "express";
import ProductController from "../../controllers/productController";
import extractToken from "../../middlewares/extractToken";
import checkRole from "../../middlewares/checkRole";
import {
  verifyCategory,
  verifyCategoryExists,
} from "../../middlewares/verifyProduct";
import { validateCategory } from "../../validations/product.validation";

const route = Router();

route.post(
  "/",
  extractToken,
  checkRole(["admin"]),
  validateCategory,
  verifyCategory,
  ProductController.addCategory
);
route.get("/", ProductController.viewCategories);
route.delete(
  "/:id",
  extractToken,
  checkRole(["admin"]),
  verifyCategoryExists,
  ProductController.deleteCategory
);
export default route;
