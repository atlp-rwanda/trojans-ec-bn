/* eslint-disable require-jsdoc */
import ProfileServices from "../services/profile.service";

class ProfileController {
  static async updatePassword(req, res) {
    try {
      await ProfileServices.updatePassword(res.locals);
      return res.status(200).json({ status: 200, message: "Password updated" });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server Error" });
    }
  }
}

export default ProfileController;
