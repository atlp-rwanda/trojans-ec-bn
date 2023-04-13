/* eslint-disable require-jsdoc */
const { Message, User } = require("../database/models");

class chatServices {
  static async viewAllChats() {
    // console.log(await User.findAll())
    const chats = await Message.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: User,
          attributes:["profilePic","name","email","role"],
        },
      ],
    });
    return chats;
  }

  static async viewOneChat(id) {
    const chat = await Message.findOne({ where: { id } });
    return chat;
  }
}
export default chatServices;
