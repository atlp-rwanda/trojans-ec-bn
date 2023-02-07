import express from "express";
import allRoute from "./api/index";

const routes = express.Router();


routes.use("/api/v1", allRoute);
export default routes;
