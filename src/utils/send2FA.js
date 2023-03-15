/* eslint-disable no-else-return, require-jsdoc */
import JwtUtil from "./generateToken";

class TwoFactorAuthenticator {
  static async validateTwoFacor(req) {
    const userToken = req.params.token;
    const extractor = JwtUtil.verify(userToken);
    const TOTP = extractor.data.randomAuth;
    const { token } = req.body;
    let value;
    if (token === parseInt(TOTP, 10)) {
      const user = {
        name: extractor.data.name,
        email: extractor.data.email,
        id: extractor.data.id,
        role: extractor.data.role,
        status: extractor.data.status,
        profilePic: extractor.data.profilePic,
        lastTimePasswordUpdated: extractor.data.lastTimePasswordUpdated,
      };
      const newToken = JwtUtil.generate(user);
      value = true;
      return { newToken, value };
    } else {
      value = false;
      return { value, message: "invalid token" };
    }
  }
}

export default TwoFactorAuthenticator;
