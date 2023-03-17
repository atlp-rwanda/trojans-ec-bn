/* eslint-disable require-jsdoc */
import NotificationServices from "../services/notificationServices";

class NotificationController {
  static async getAllNotifications(req, res) {
    try {
      const notifications = await NotificationServices.getAllNotifications(
        req.user.id
      );
      return res.status(200).json({ status: 200, notifications });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }

  static async deleteNotification(req, res) {
    try {
      const response = await NotificationServices.deleteNotification({
        notId: req.params.id,
        userId: req.user.id,
      });
      if (response === "not exist") {
        return res
          .status(404)
          .json({ status: 404, error: "Notification doesn't exist" });
      }
      if (response === "forbidden") {
        return res.status(403).json({
          status: 403,
          error: "You are not the recipient of the notification",
        });
      }
      return res
        .status(202)
        .json({ status: 202, message: "Notification deleted" });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }

  static async markNotification(req, res) {
    try {
      const responseNot = await NotificationServices.markNotification(req);
      if (responseNot === true) {
        return res
          .status(200)
          .json({ status: 200, message: "Notification marked as Read" });
      }
      return res.status(207).json({
        status: 207,
        message: "Notification Already marked as Read",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }

  static async markAllNotifications(req, res) {
    try {
      const allNotificationRes =
        await NotificationServices.markAllNotifications(req);
      if (allNotificationRes === true) {
        return res
          .status(200)
          .json({ status: 200, message: "All notifications marked as Read" });
      }
      return res.status(207).json({
        status: 207,
        message: "All notifications already marked as Read",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }
}
export default NotificationController;
