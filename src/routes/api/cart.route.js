import { Router } from "express";
import CartController from "../../controllers/CartController";
import extractToken from "../../middlewares/extractToken";
import checkRole from "../../middlewares/checkRole";

const route = Router();

route.post("/:id", extractToken, checkRole(["buyer"]), CartController.addItem);
route.get("/", extractToken, checkRole(["buyer"]), CartController.getCartItems);
route.delete("/", extractToken, checkRole(["buyer"]), CartController.clearCart);
route.put(
  "/:id",
  extractToken,
  checkRole(["buyer"]),
  CartController.updateCart
);

export default route;
