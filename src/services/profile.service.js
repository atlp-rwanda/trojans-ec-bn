/* eslint-disable require-jsdoc */
import BcryptUtil from "../utils/bcrypt";

const { User } = require("../database/models");

class ProfileServices {
  static async updatePassword(data) {
    const password = await BcryptUtil.hash(data.password);
    await User.update({ password }, { where: { email: data.email } });
  }
}

export default ProfileServices;
