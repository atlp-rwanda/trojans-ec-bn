/* eslint-disable require-jsdoc */
import Jwt from "jsonwebtoken";

class JwtUtil {
  static generate(data, options) {
    const token = Jwt.sign({ data }, process.env.JWT_SECRET, options);
    return token;
  }

  static generateExp(data, min) {
    const token = Jwt.sign({ data }, process.env.JWT_SECRET, {
      expiresIn: min,
    });
    return token;
  }

  static verify(token) {
    const obj = Jwt.verify(token, process.env.JWT_SECRET);
    return obj;
  }
}

export default JwtUtil;
