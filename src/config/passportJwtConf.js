import { Strategy, ExtractJwt } from "passport-jwt";
// import Extract from "passport-jwt";
import passport from "passport";
import dotenv from "dotenv";
import { User } from "../database/models/index";

dotenv.config();

// const JwtStrategy = newJwt.Strategy;

const extractJwt = ExtractJwt;

// async function passportJwtConfig(){
passport.use(
  new Strategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findOne({ _id: jwtPayload });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ),
);
// }

export default passport;
