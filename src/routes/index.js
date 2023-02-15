import express, { Router } from "express";
import home from "./api/home.route";
import user from "./api/user.route";
import product from "./api/product.route";
import category from "./api/category.route";

const routes = express.Router();

routes.use("/", home);
routes.use("/users", user);
routes.use("/products", product);
routes.use("/category", category);

export default routes;
