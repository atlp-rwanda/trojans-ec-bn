/* eslint-disable require-jsdoc */
import bcrypt from "bcrypt";

class BcryptUtil {
  static async hash(string) {
    const pasSalt = await bcrypt.genSalt(10);
    const pasHash = await bcrypt.hash(string, pasSalt);
    return pasHash;
  }

  static async compare(string1, string2) {
    const validPass = await bcrypt.compare(string1, string2);
    return validPass;
  }
}

export default BcryptUtil;
