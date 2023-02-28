import { Router } from "express";
import NotificationController from "../../controllers/notificationController";
import extractToken from "../../middlewares/extractToken";
import isPasswordExpired from "../../middlewares/isPasswordExpired";

const route = Router();

route.get(
  "/",
  extractToken,
  isPasswordExpired,
  NotificationController.getAllNotifications
);
route.delete(
  "/:id",
  extractToken,
  isPasswordExpired,
  NotificationController.deleteNotification
);

export default route;
