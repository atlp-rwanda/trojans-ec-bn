/* eslint-disable require-jsdoc */
import chatServices from "../services/chatServices";

class chatController {
  static async viewAllChats(req, res) {
    try {
      const chats = await chatServices.viewAllChats();
      return res.status(200).json({ status: 200, chats });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }

  static async viewOneChat(req, res) {
    try {
      const chat = await chatServices.viewOneChat(req.params.id);
      if (chat === null) {
        return res
          .status(404)
          .json({ status: 404, error: "No Chat Matching That Id" });
      }
      return res.status(200).json({ status: 200, chat });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }
}

export default chatController;
