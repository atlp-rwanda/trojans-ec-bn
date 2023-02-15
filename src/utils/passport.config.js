import passport from "passport";
import PassportLocal from "passport-local";
import models from "../database/models";

const { BcryptUtil } = require("./bcrypt");

passport.use(
  new PassportLocal.Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      const userFound = await models.User.findOne({
        where: { email },
      });
      if (!userFound) {
        done(null, false);
      } else {
        const isPin = await BcryptUtil.compare(password, userFound.password);
        if (!isPin) {
          done(null, false);
        } else {
          return done(null, userFound);
        }
      }
    }
  ),
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
