import passport from "passport";

const googleAuth = passport.authenticate("google", {
  scope: ["email", "profile"],
});
const googleCallBack = passport.authenticate("google", {
  failureRedirect: "/api/v1/users/auth/google",
});

export { googleAuth, googleCallBack };
