/* eslint-disable no-else-return */
/* eslint-disable require-jsdoc */
import JwtUtil from "./generateToken";

class TwoFactorAuthenticator {
  static async validateTwoFacor(req) {
    const userToken = req.params.token;
    const extractor = JwtUtil.verify(userToken);
    const TOTP = extractor.data.randomAuth;
    const { token } = req.body;
    let value;
    if (token === TOTP) {
      const user = {
        name: extractor.data.name,
        email: extractor.data.email,
        id: extractor.data.id,
        role: extractor.data.role,
        status: extractor.data.status,
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
