import { Router } from "express";
import extractToken from "../../middlewares/extractToken";
import checkRole from "../../middlewares/checkRole";
import wishListController from "../../controllers/wishListController";
import IsProductExist from "../../middlewares/checkProductExist";

const route = Router();

route.post(
  "/",
  extractToken,
  checkRole(["buyer"]),
  IsProductExist,
  wishListController.addToWishList
);
route.get(
    "/",
    extractToken,
    checkRole(["buyer"]),
  
    wishListController.getWishList
  );


export default route;
