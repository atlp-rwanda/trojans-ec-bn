/* eslint-disable no-console */
import Emitter from "../eventEmitter/user";
import { userEventEmitter } from "../../services/userService";
import "dotenv/config";
import SendEmail from "../../utils/email";
import { User } from "../../database/models";

const emitter = new Emitter();
emitter.on("passwordExpired", async (userObj) => {
  try {
    await new SendEmail(
      userObj,
      process.env.HOME_PAGE_URL,
      null
    ).expiredPassword();
  } catch (error) {
    console.log(error);
  }
});
emitter.isPasswordExpired();

userEventEmitter.on("sendWelcome", async (data) => {
  try {
    const { name, email, token } = data;
    const url = `${process.env.UI_URL}/users/verify-email/${token}`;
    await new SendEmail({ name, email }, url, null).sendWelcome();
  } catch (error) {
    console.log(error);
  }
});

userEventEmitter.on("passwordUpdated", async (data) => {
  try {
    await new SendEmail(
      data,
      process.env.HOME_PAGE_URL,
      null
    ).passwordUpdated();
  } catch (error) {
    console.log(error);
  }
});

userEventEmitter.on("passwordReset", async (data) => {
  try {
    const user = await User.findOne({ where: { email: data } });
    await new SendEmail(
      user,
      process.env.HOME_PAGE_URL,
      null
    ).successPassReset();
  } catch (error) {
    console.log(error);
  }
});

userEventEmitter.on("sendGooglePassword", async (data) => {
  try {
    const { userObj, password } = data;
    await new SendEmail(userObj, null, password).sendGooglePassword();
  } catch (error) {
    console.log(error);
  }
});

userEventEmitter.on("resetRequest", async (data) => {
  try {
    const { olduser, token } = data;
    await new SendEmail(
      olduser,
      `${process.env.UI_URL}/users/password-reset/${token}`,
      null
    ).reset();
  } catch (error) {
    console.log(error);
  }
});

userEventEmitter.on("disableAccount", async (data) => {
  try {
    const { user } = data;
    await new SendEmail(user, null, null).deactivate();
  } catch (error) {
    console.log(error);
  }
});

userEventEmitter.on("activateAccount", async (data) => {
  try {
    const { user } = data;
    await new SendEmail(user, null, null).activate();
  } catch (error) {
    console.log(error);
  }
});

userEventEmitter.on("twoFactorAuth", async (data) => {
  try {
    const { userInfo, randomAuth } = data;
    await new SendEmail(userInfo, null, randomAuth).twoFactorAuth();
  } catch (error) {
    console.log(error);
  }
});
