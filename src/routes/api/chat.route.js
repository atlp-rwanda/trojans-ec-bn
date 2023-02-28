import { Router } from "express";
import chatController from "../../controllers/chatController";
import extractToken from "../../middlewares/extractToken";
import isPasswordExpired from "../../middlewares/isPasswordExpired";

const route = Router();

route.get("/", extractToken, isPasswordExpired, chatController.viewAllChats);
route.get("/:id", extractToken, isPasswordExpired, chatController.viewOneChat);

export default route;
