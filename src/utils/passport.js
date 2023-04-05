import passport from "passport";

const googleAuth = passport.authenticate("google", {
  scope: ["email", "profile"],
  session: false,
  prompt: "select_account",
});
const googleCallBack = passport.authenticate("google", {
  failureRedirect: "/api/v1/users/auth/google",
});

export { googleAuth, googleCallBack };
