import express, { Router } from "express";
import home from "./api/home.route";
import user from "./api/user.route";
import profile from "./api/profile.route";

const routes = express.Router();

routes.use("/", home);
routes.use("/", user);
routes.use("/users", profile);
export default routes;
