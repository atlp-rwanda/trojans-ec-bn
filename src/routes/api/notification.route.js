import { Router } from "express";
import NotificationController from "../../controllers/notificationController";
import extractToken from "../../middlewares/extractToken";
import isPasswordExpired from "../../middlewares/isPasswordExpired";
import IsNotificationExist from "../../middlewares/checkNotification";
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

route.post(
  "/:id",
  extractToken,
  isPasswordExpired,
  IsNotificationExist,
  NotificationController.markNotification
);

route.post(
  "/",
  extractToken,
  isPasswordExpired,
  NotificationController.markAllNotifications
);

export default route;
