/* eslint-disable require-jsdoc */
import BcryptUtil from "../utils/bcrypt";
import JwtUtil from "../utils/generateToken";

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
}

export default UserServices;
