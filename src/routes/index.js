import express from "express";
import home from "./api/home.route";
import user from "./api/user.route";
import product from "./api/product.route";
import category from "./api/category.route";
import wishes from "./api/product_wishes.route";

const routes = express.Router();

routes.use("/", home);
routes.use("/users", user);
routes.use("/products", product);
routes.use("/categories", category);
routes.use("/productWishes", wishes);

export default routes;
