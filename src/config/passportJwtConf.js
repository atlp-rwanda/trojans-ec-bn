import newJwt from 'passport-jwt';
import Extract from "passport-jwt";
import passport from 'passport';
import {User} from '../database/models/index';
import dotenv from 'dotenv'

dotenv.config()

const JwtStrategy= newJwt.Strategy;

const extractJwt= Extract.ExtractJwt;

//async function passportJwtConfig(){
    passport.use(
        new JwtStrategy(
            {
                secretOrKey: process.env.JWT_SECRET,
                jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken()
            },
            async (jwtPayload, done) => {
                try {
                    const user = await User.findOne({ _id: jwtPayload });
                    return done(null, user);
                } catch (err) {
                    return done(err);
                }
              }
        )
    )
//}

export default passport;