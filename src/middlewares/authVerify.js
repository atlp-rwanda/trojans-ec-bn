import passport from "passport";

const authLogin = passport.authenticate("local");
const checkAuth = passport.authenticate("jwt", { session: false });

export { authLogin, checkAuth };
