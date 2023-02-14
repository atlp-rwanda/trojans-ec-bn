import JwtUtil from "../utils/generateToken";
import { Blacklist } from "../database/models";

const { User } = require("../database/models");

const extractToken = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      return res.status(401).json({ status: 401, message: "Please sign in" });
    }
    const token = req.header("Authorization").split(" ")[1];
    const exists = await Blacklist.findOne({ where: { token } });
    if (exists) {
      return res
        .status(403)
        .json({ status: 403, message: "Access denied,please login" });
    }
    const details = JwtUtil.verify(token);
    const userExists = await User.findOne({
      where: { email: details.data.email },
    });
    if (!userExists) {
      return res.status(401).json({ message: "User not found!" });
    }
    req.user = details.data;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: 401, message: "No valid credentials" });
  }
};

export default extractToken;
