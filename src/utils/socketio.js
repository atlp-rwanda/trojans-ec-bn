/* istanbul ignore file */
/* eslint-disable no-console */

import socketio from "socket.io";
import JwtUtil from "./generateToken";

const { Message, User, Notification } = require("../database/models");

const userObj = {};

const userExists = (token, next) => {
  try {
    const { data } = JwtUtil.verify(token);
    User.findOne({
      where: {
        id: data.id,
      },
    }).then((res) => {
      if (res) {
        userObj.id = res.dataValues.id;
        userObj.name = res.dataValues.name;
        next();
      } else {
        next(new Error("user doesn't exist"));
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line import/no-mutable-exports
let io;

const ioConnect = (http) => {
  io = socketio(http, { cors: { origin: "*" } });
  io.use((socket, next) => {
    if (socket.handshake.headers.token !== "null") {
      userExists(socket.handshake.headers.token, next);
    } else {
      console.log("No validToken Found");
    }
  });
  const users = {};

  io.on("connection", (socket) => {
    socket.join(`user-${userObj.id}`);
    Notification.findAll({
      where: { recipientId: userObj.id, read: false },
    })
      .then((notRes) => {
        if (notRes.length > 0) {
          const notifins = notRes.map((notf) => notf.dataValues);
          socket.emit("notifications", notifins);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    Message.findAll({
      include: [
        {
          model: User,
          attributes: ["profilePic","name","email","role"],
        },
      ],
    })
      .then((res) => {
        if (res.length > 0) {
          const messages = res.map((message) =>message.dataValues);
          socket.emit("allMessages", messages);
        }
      })
      .catch((error) => {
        console.error(error);
      });

      console.log(userObj.name)
    socket.emit("username", userObj.name);

    socket.on("new-user", () => {
      users[socket.id] = userObj.name;
      socket.broadcast.emit("user-connected", userObj.name);
    });

    socket.on("send-chat-message", (message) => {
      console.log(message)
      Message.create({
        userId: userObj.id,
        message: message.message,
      }).catch((error) => {
        console.error(error);
      });
      socket.broadcast.emit("chat-message", {
        message: message.message,
        name: message.username,
        date: message.date,
      });
    });

    socket.on("disconnect", () => {
      console.log(users[socket.id]);
      console.log("disconnected");
      socket.broadcast.emit("user-disconnected", users[socket.id]);
      delete users[socket.id];
    });
  });
};

export { ioConnect, userExists, io };
