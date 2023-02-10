import express, { Router } from "express";
import home from "./api/home.route";
import user from "./api/user.route";

const routes = express.Router();

routes.use("/", home);
routes.use("/users", user);

export default routes;
