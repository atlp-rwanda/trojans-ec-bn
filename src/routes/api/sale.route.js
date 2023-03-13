import { Router } from "express";
import SaleController from "../../controllers/saleController";
import validateStatus from "../../middlewares/changeSale";
import checkRole from "../../middlewares/checkRole";
import isSaleExist from "../../middlewares/checkSaleExist";
import checkSaleOwner from "../../middlewares/checkSaleOwner";
import extractToken from "../../middlewares/extractToken";
import isPasswordExpired from "../../middlewares/isPasswordExpired";

const route = Router();

route.patch(
  "/:id",
  extractToken,
  isPasswordExpired,
  checkRole(["seller"]),
  isSaleExist,
  checkSaleOwner,
  validateStatus,
  SaleController.updateSaleStatus
);

export default route;
