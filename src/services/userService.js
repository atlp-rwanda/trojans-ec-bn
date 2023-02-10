/* eslint-disable require-jsdoc */
import BcryptUtil from "../utils/bcrypt";
import JwtUtil from "../utils/generateToken";
import SendEmail from "../utils/email";

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
        role: user.role,
        status: user.status,
      }),
    };
    return userObj;
  }

  static async login(data) {
    const { email, name } = data;
    const user = await User.findOne({ where: { email } });
    const token = JwtUtil.generate({
      name,
      email,
      id: user.id,
      role: user.role,
      status: user.status,
    });

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
    await new SendEmail(
      olduser,
      `${process.env.UI_URL}/users/password-reset/${token}`
    ).reset();
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

  static async getUsers() {
    const users = await User.findAll();
    return users;
  }

  static async assignRole(role, id) {
    await User.update(
      { role },
      {
        where: {
          id,
        },
      }
    );
  }

  static async disableAccount(id) {
    const user = await User.findOne({
      where: { id },
    });
    if (user.status === "active") {
      await User.update(
        { status: "inactive" },
        {
          where: {
            id,
          },
        },
      );
      await new SendEmail(user, null).deactivate();
      return "deactivated";
    }
    if (user.status === "inactive") {
      await User.update(
        { status: "active" },
        {
          where: {
            id,
          },
        },
      );
      await new SendEmail(user, null).activate();
      return "activated";
    }
  }
}

export default UserServices;
