/* eslint-disable require-jsdoc */

import UserServices from "../services/userService";
import SendEmail from "../utils/email";

class UserController {
  static async register(req, res) {
    try {
      const response = await UserServices.register(req.body);
      const url = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/users/verify-email/${response.token}`;
      await new SendEmail(response, url).sendWelcome();
      return res.status(201).json({ status: 201, user: response });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "server Error" });
    }
  }

  static async login(req, res) {
    try {
      const response = await UserServices.login(req.body);
      return res.status(200).json({ status: 200, user: response });
    } catch (error) {
      return res.status(500).json({ status: 500, message: "server error" });
    }
  }

  static async verify_email(req, res) {
    const {token} = req.params;
    try {
      const response = await UserServices.updateUserStatus(token);
      return res.status(200).json({ status: 200, response });
    } catch (error) {
      return res.status(500).json({ status: 500, message: "server error" });
    }
  }
}
export default UserController;
