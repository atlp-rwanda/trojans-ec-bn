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
}
export default NotificationServices;
