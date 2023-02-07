/* eslint-disable require-jsdoc */
import bcryptjs from "bcryptjs";

const { hash, compare } = bcryptjs;

class BcryptUtil {
  static async hash(string) {
    // const pasSalt = await bcrypt.genSalt(10);
    const pasHash = await hash(string, 10);
    return pasHash;
  }

  static async compare(string1, string2) {
    const validPass = await compare(string1, string2);
    return validPass;
  }
}

export default BcryptUtil;
