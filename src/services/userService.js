/* eslint-disable no-else-return, require-jsdoc */
import EventEmitter from "events";
import Jwt from "jsonwebtoken";
import { BcryptUtil } from "../utils/bcrypt";
import JwtUtil from "../utils/generateToken";

const userEventEmitter = new EventEmitter();
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
      profilePic,
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
      profilePic,
    });
    await user.save();
    const userObj = {
      name,
      email,
      token: JwtUtil.generateExp(
        {
          name,
          id: user.id,
          email,
          role: user.role,
          status: user.status,
          isVerified: user.isVerified,
          profilePic: user.profilePic,
          lastTimePasswordUpdated: user.lastTimePasswordUpdated,
        },
        "2m"
      ),
    };
    const token = JwtUtil.generate({
      name,
      id: user.id,
      email,
      role: user.role,
      status: user.status,
      isVerified: user.isVerified,
      profilePic: user.profilePic,
      lastTimePasswordUpdated: user.lastTimePasswordUpdated,
    });
    userEventEmitter.emit("sendWelcome", { name, email, token });
    return userObj;
  }

  static async logout(data) {
    const token = data.split(" ")[1];
    await Blacklist.create({ token });
  }

  static async updatePassword(data) {
    const password = BcryptUtil.hash(data.password);
    await User.update(
      { password, lastTimePasswordUpdated: new Date() },
      { where: { email: data.email } }
    );
    userEventEmitter.emit("passwordUpdated", data);
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
    userEventEmitter.emit("resetRequest", { olduser, token });
    return { message: "Sent", token };
  }

  static async resetpassword(data) {
    const { email, password } = data;
    await User.update(
      {
        password: BcryptUtil.hash(password),
        lastTimePasswordUpdated: new Date(),
      },
      {
        where: {
          email,
        },
      }
    );
    userEventEmitter.emit("passwordReset", email);
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
      userEventEmitter.emit("disableAccount", { user });
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
      userEventEmitter.emit("activateAccount", { user });
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

  static async googleAuth(data) {
    const { displayName, email, picture } = data;
    const userExist = await User.findOne({
      where: { email },
    });

    if (userExist) {
      if (userExist.isVerified === false) {
        return "not verified";
      }
      const token = JwtUtil.generate({
        name: userExist.name,
        id: userExist.id,
        email: userExist.email,
        role: userExist.role,
        status: userExist.status,
        isVerified: userExist.isVerified,
        profilePic: userExist.profilePic,
        lastTimePasswordUpdated: userExist.lastTimePasswordUpdated,
      });

      return { name: displayName, token };
    }

    const password = `default${Math.floor(Math.random() * 100)}`;
    const userObj = {
      name: displayName,
      email,
      password,
      gender: "Male",
      preferredLanguage: "English",
      preferredCurrency: "RWF",
      birthdate: "01/01/2000",
      billingAddress:
        '{"street":"KN 05 ST","city":"Kigali","province":"Kigali","postalCode":"00000","country":"Rwanda"}',
      profilePic: picture,
    };
    const resp = await this.register(userObj);
    userEventEmitter.emit("sendGooglePassword", { userObj, password });

    return resp;
  }
}

export { UserServices, userEventEmitter };
