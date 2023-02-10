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
      return res.status(500).json({ status: 500, error: "Server error" });
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

  static async updatePassword(req, res) {
    try {
      await UserServices.updatePassword(req.user);
      return res.status(200).json({ status: 200, message: "Password updated" });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server Error" });
    }
  }

  static async resetRequest(req, res) {
    try {
      const { email } = req.body;
      const response = await UserServices.resetRequest(email);
      if (!response) {
        return res.status(403).json({ message: "Email couldn't be verified" });
      }
      return res.status(200).json({
        message: "Sent",
        link: `${process.env.UI_URL}/users/password-reset/${response.token}`,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static async getReset(req, res) {
    try {
      return res.status(200).json({ details: req.user });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static async resetpassword(req, res) {
    try {
      const data = {
        password: req.body.newPassword,
        email: req.user.email,
      };
      await UserServices.resetpassword(data);
      return res.status(200).json({ message: "Password updated" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
export default UserController;
