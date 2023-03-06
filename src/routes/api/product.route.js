import { Router } from "express";
import ProductController from "../../controllers/productController";
import checkRole from "../../middlewares/checkRole";
import extractToken from "../../middlewares/extractToken";
import { validateProduct } from "../../validations/product.validation";
import {
  IsProductExist,
  productExistAlready,
} from "../../middlewares/checkProductExist";
import checkOwner from "../../middlewares/checkOwner";
import ProductWishesController from "../../controllers/productWishesController";
import validationOfQueries from "../../validations/query.validation";
import isPasswordExpired from "../../middlewares/isPasswordExpired";
import isBought from "../../middlewares/isBought";
import isProvided from "../../middlewares/isProvided";
import validationOfRatings from "../../validations/ratings.validation";
import isAvailable from "../../middlewares/isAvalaible";
import RatedBy from "../../middlewares/ratedBy";
import rateAvailable from "../../middlewares/rateAvailable";
import { uploadArray } from "../../middlewares/uploadCloud";
import checkPriceRange from "../../middlewares/checkPrice";

const route = Router();

route.post(
  "/",
  extractToken,
  isPasswordExpired,
  checkRole(["seller"]),
  uploadArray("image"),
  validateProduct,
  productExistAlready,
  ProductController.addItem
);
route.get(
  "/stats",
  extractToken,
  checkRole(["seller"]),
  ProductController.getStats
);
route.get("/", extractToken, isPasswordExpired, ProductController.getAllItems);

route.get(
  "/search",
  validationOfQueries,
  checkPriceRange,
  ProductController.searchItem
);

route.get(
  "/productWishes",
  extractToken,
  checkRole(["seller"]),
  ProductWishesController.getProductWishesSeller
);
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
  IsProductExist,
  ProductController.getSingleItem
);
route.patch(
  "/:id",
  extractToken,
  isPasswordExpired,
  checkRole(["seller"]),
  IsProductExist,
  checkOwner,

  ProductController.markAvailable
);
route.delete(
  "/:id",
  extractToken,
  isPasswordExpired,
  checkRole(["seller"]),
  IsProductExist,
  checkOwner,
  ProductController.deleteItem
);
route.put(
  "/:id",
  extractToken,
  isPasswordExpired,
  checkRole(["seller"]),
  uploadArray("image"),
  validateProduct,
  IsProductExist,
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

route.post(
  "/:id/ratings",
  extractToken,
  checkRole(["buyer"]),
  IsProductExist,
  isBought,
  isProvided,
  validationOfRatings,
  ProductController.createRatings
);

route.put(
  "/:id/ratings/:ratingId",
  extractToken,
  checkRole(["buyer"]),
  IsProductExist,
  rateAvailable,
  isAvailable,
  RatedBy,
  validationOfRatings,
  ProductController.updateRatings
);

export default route;
