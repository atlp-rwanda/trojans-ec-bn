import passport from "passport";

const authLogin = passport.authenticate("local");

const googleAuth = passport.authenticate("google", {
  scope: ["email", "profile"],
});
const googleCallBack = passport.authenticate("google", {
  failureRedirect: "/api/v1/users/auth/google",
});

export { googleAuth, googleCallBack, authLogin };
