/* eslint-disable require-jsdoc */
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
// import { genSaltSync, hashSync, compareSync } from "bcrypt";
class BcryptUtil {
  static hash(string) {
    const pasSalt = genSaltSync(10, "b");
    const pasHash = hashSync(string, pasSalt);
    return pasHash;
  }

  static compare(string1, string2) {
    const validPass = compareSync(string1, string2);
    return validPass;
  }
}
// export { BcryptUtil };
module.exports = { BcryptUtil };
