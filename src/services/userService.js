/* eslint-disable require-jsdoc */

import Jwt from "jsonwebtoken";
import BcryptUtil from "../utils/bcrypt";
import JwtUtil from "../utils/generateToken";

const { User } = require("../database/models");

class UserServices {
  static async register(data) {
    const { name, email, password } = data;
    const user = await User.create({
      name,
      email,
      isVerified: false,
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
    const { email, password } = data;

    const currentUser = await User.findOne({ where:{ email } });

    if (!currentUser) return { message: "User doesn't exist" };

    const hashedPassword = await BcryptUtil.compare(
      password,
      currentUser.password
    );

    if (hashedPassword) {
      const token = JwtUtil.generate({
        name: currentUser.name,
        id: currentUser.id,
        email: currentUser.email,
      });
      return { name: currentUser.name, email: currentUser.email, token };
    }
  }

  static async updateUserStatus(token) {

    const {data} = Jwt.verify(
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
}

export default UserServices;
