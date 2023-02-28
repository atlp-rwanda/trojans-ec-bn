/* eslint-disable require-jsdoc */
import { Notification } from "../database/models";

class NotificationServices {
  static async getAllNotifications(id) {
    const notifications = await Notification.findAll({
      where: { recipientId: id },
    });
    return notifications;
  }

  static async deleteNotification(data) {
    const notification = await Notification.findOne({
      where: { id: data.notId },
    });
    if (!notification) {
      return "not exist";
    }
    if (notification.recipientId !== data.userId) {
      return "forbidden";
    }
    await Notification.destroy({
      where: { id: data.notId, recipientId: data.userId },
    });
  }

  static async markNotification(req) {
    const userId = req.user.id;
    const notificationId = req.params.id;
    const notification = await Notification.findOne({
      where: { id: notificationId, recipientId: userId },
    });
    if (notification.dataValues.read === false) {
      await Notification.update(
        { read: true },
        {
          where: { recipientId: userId, id: notificationId },
        }
      );
      return true;
    }
    return false;
  }

  static async markAllNotifications(req) {
    const userId = req.user.id;
    const notification = await Notification.findOne({
      where: { recipientId: userId, read: false },
    });
    if (notification) {
      await Notification.update(
        { read: true },
        {
          where: { recipientId: userId },
        }
      );
      return true;
    }
    return false;
  }
}
export default NotificationServices;
