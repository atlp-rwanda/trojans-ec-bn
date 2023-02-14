/* eslint-disable no-else-return */
/* eslint-disable require-jsdoc */
import Jwt from "jsonwebtoken";
import { BcryptUtil } from "../utils/bcrypt";
import JwtUtil from "../utils/generateToken";
import SendEmail from "../utils/email";
import generateRandom from "../utils/generateRandom";

const { User, Blacklist } = require("../database/models");

class UserServices {
  static async register(data) {
    const {
      name,
      email,
      password,
      gender,
      birthdate,
      preferredLanguage,
      preferredCurrency,
      billingAddress,
    } = data;
    const user = await User.create({
      name,
      email,
      password: await BcryptUtil.hash(password),
      gender,
      birthdate,
      preferredLanguage,
      preferredCurrency,
      billingAddress,
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
        isVerified: user.isVerified,
        profilePic: user.profilePic,
      }),
    };
    const token = JwtUtil.generate({
      name,
      id: user.id,
      email,
      role: user.role,
      status: user.status,
      isVerified: user.isVerified,
    });
    const url = `${process.env.UI_URL}/users/verify-email/${token}`;
    await new SendEmail(userObj, url).sendWelcome();
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

  static async logout(data) {
    const token = data.split(" ")[1];
    await Blacklist.create({ token });
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
      `${process.env.UI_URL}/users/password-reset/${token}`,
      null
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
        }
      );
      await new SendEmail(user, null, null).deactivate();
      return "deactivated";
    }
    if (user.status === "inactive") {
      await User.update(
        { status: "active" },
        {
          where: {
            id,
          },
        }
      );
      await new SendEmail(user, null, null).activate();
      return "activated";
    }
  }

  static async updateUserStatus(token) {
    const { data } = Jwt.verify(
      `Bearer ${token}`.split(" ")[1],
      process.env.JWT_SECRET
    );

    const user = await User.findOne({
      where: { id: data.id, isVerified: false },
    });

    if (user) {
      user.isVerified = true;
      await user.save();
      const response = { message: "Email validated successfully." };
      return response;
    }
  }

  static async updateProfile(data) {
    const user = await User.findOne({ where: { email: data.email } });
    if (data.profilePic) {
      await User.update(
        { profilePic: data.profilePic },
        {
          where: {
            id: user.id,
          },
        }
      );
    }
    await User.update(
      {
        preferedLanguage: data.preferedLanguage,
        preferredCurrency: data.preferredCurrency,
        billingAddress: data.billingAddress,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
  }
}

export default UserServices;
