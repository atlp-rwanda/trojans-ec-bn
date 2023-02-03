/* eslint-disable require-jsdoc */
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const { User } = require("../database/models");

export class UserController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const userEmail = await User.findOne({ where: { email } });
      if (userEmail) {
        return res.status(409).send("Email Already Exists");
      }
      const pasSalt = await bcrypt.genSalt(10);
      const pasHash = await bcrypt.hash(password, pasSalt);
      const user = await User.create({
        name,
        email,
        password: pasHash,
      });
      await user.save();
      const givenToken = Jwt.sign(
        {
          name: user.name,
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET // eslint-disable-line
      );
      const userObj = {
        username: user.name,
        useremail: user.email,
        UserToken: givenToken,
      };
      return res.status(201).send(userObj);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
