import passport from "passport";

const authLogin = passport.authenticate("local");

export default authLogin;
