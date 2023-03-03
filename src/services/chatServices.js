/* eslint-disable require-jsdoc */
const { Message } = require("../database/models");

class chatServices {
  static async viewAllChats() {
    const chats = await Message.findAll();
    return chats;
  }

  static async viewOneChat(id) {
    const chat = await Message.findOne({ where: { id } });
    return chat;
  }
}
export default chatServices;
