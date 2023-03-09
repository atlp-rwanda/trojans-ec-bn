/* eslint-disable require-jsdoc */
const { Notification } = require("../database/models");

export default async function IsNotificationExist(req, res, next) {
  try {
    const notificationId = req.params.id;
    const notification = await Notification.findOne({
      where: { id: notificationId },
    });
    if (!notification) {
      return res
        .status(404)
        .json({ status: 404, message: "Notification does not exist" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: "Server error" });
  }
}
