/* eslint-disable require-jsdoc */
const { Notification } = require("../database/models");

export async function IsNotificationExist(req, res, next) {
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
    req.notification = notification.dataValues;
    next();
  } catch (error) {
    return res.status(500).json({ status: 500, error: "Server error" });
  }
}

export async function checkNotificationOwner(req, res, next) {
  try {
    if (req.notification.recipientId === req.user.id) {
      next();
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "Notification does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, error: "Server error" });
  }
}
