import express from "express";
import home from "./api/home.route";
import user from "./api/user.route";
import product from "./api/product.route";
import category from "./api/category.route";
import wishes from "./api/product_wishes.route";
import cart from "./api/cart.route";
import chat from "./api/chat.route";

const routes = express.Router();

routes.use("/", home);
routes.use("/users", user);
routes.use("/products", product);
routes.use("/categories", category);
routes.use("/productWishes", wishes);
routes.use("/carts", cart);
routes.use("/chats", chat);

export default routes;
