import express from "express";
import allRoute from "./api/index";

const routes = express.Router();

routes.use("/", allRoute);

export default routes;
