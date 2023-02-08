/* eslint-disable require-jsdoc */
import BcryptUtil from "../utils/bcrypt";
import JwtUtil from "../utils/generateToken";
import mailer from "../utils/sendmail";
import emailContent from "../utils/emailHtml";

const { User } = require("../database/models");

class UserServices {
  static async register(data) {
    const { name, email, password } = data;
    const user = await User.create({
      name,
      email,
      password: await BcryptUtil.hash(password),
    });
    await user.save();
    const userObj = {
      name,
      email,
      token: JwtUtil.generate({
        name,
        id: user.id,
        email,
      }),
    };
    return userObj;
  }

  static async login(data) {
    const { email, name } = data;
    const token = JwtUtil.generate({ name, email });
    return { name, token };
  }

  static async updatePassword(data) {
    const password = await BcryptUtil.hash(data.password);
    await User.update({ password }, { where: { email: data.email } });
  }

  static async resetRequest(email) {
    const olduser = await User.findOne({ where: { email } });
    if (!olduser) {
      return false;
    }
    const token = JwtUtil.generateExp(
      { email: olduser.email, id: olduser.id },
      "5m"
    );
    await mailer(email, "Reset Password", emailContent.reset(token));
    return { message: "Sent", token };
  }

  static async resetpassword(data) {
    const { email, password } = data;
    await User.update(
      { password: await BcryptUtil.hash(password) },
      {
        where: {
          email,
        },
      }
    );
    return true;
  }
}

export default UserServices;
