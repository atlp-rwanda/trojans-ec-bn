import passport from "passport";
import PassportLocal from "passport-local";
import models from "../database/models";

const { BcryptUtil } = require("./bcrypt");

passport.use(
  new PassportLocal.Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const userFound = await models.User.findOne({
        where: { email },
      });

      if (!userFound) {
        return done(null, false, { message: "Account doesn't exist" });
      }

      const isPin = await BcryptUtil.compare(password, userFound.password);
      if (!isPin) {
        return done(null, false, { message: "Incorrect email or password" });
      }

      return done(null, userFound);
    }
  )
);
