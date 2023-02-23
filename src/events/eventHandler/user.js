import Emitter from "../eventEmitter/user";
import "dotenv/config";
import SendEmail from "../../utils/email";

const emitter = new Emitter();
emitter.on("passwordExpired", async (userObj) => {
  /* istanbul ignore next */
  try {
    await new SendEmail(userObj, process.env.UI_URL, null).expiredPassword();
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
});
emitter.isPasswordExpired();
