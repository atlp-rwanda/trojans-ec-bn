import { Router } from "express";
import upload from "../../config/multer";
import ProductController from "../../controllers/productController";
import checkSeller from "../../middlewares/checkSeller";
import extractToken from "../../middlewares/extractToken";
import { validateProduct } from "../../validations/product.validation";

const route = Router();

route.post(
  "/",
  upload.array("image"),
  extractToken,
  checkSeller,
  validateProduct,
  ProductController.addItem
);

export default route;
