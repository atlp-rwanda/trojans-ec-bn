import express from "express";
import useRoute from "./user.route";
import home from "./home.route";

const Router = express.Router();

Router.use("/", home);
Router.use("/users", useRoute);

export default Router;
