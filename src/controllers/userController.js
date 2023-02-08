/* eslint-disable require-jsdoc */
import UserServices from "../services/userService";

class UserController {
  static async register(req, res) {
    try {
      const response = await UserServices.register(req.body);
      return res.status(201).json({ status: 201, user: response });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }

  static async login(req, res) {
    try {
      const response = await UserServices.login(req.user);
      return res.status(200).json({ status: 200, user: response });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error });
    }
  }
}
export default UserController;
