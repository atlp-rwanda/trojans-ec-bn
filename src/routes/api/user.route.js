/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { Router } from "express";
import UserController from "../../controllers/userController";
import signupValidation from "../../validations/signup.validation";
import loginValidation from "../../validations/login.validation";
import verifyUser from "../../middlewares/verifyUser";
import passwordValidation from "../../validations/pass.update.validation";
import checkPass from "../../middlewares/checkPass";
import resetData from "../../middlewares/resetData";
import extractToken from "../../middlewares/extractToken";
import passwordResetValidation from "../../validations/pass.reset.validation";
import checkAdmin from "../../middlewares/checkAdmin";
import findUser from "../../middlewares/findUser";
import { googleAuth, googleCallBack, authLogin } from "../../utils/passport";
import validateRole from "../../validations/role.validation";
import verifyToken from "../../middlewares/verifyToken";
import checkIsVerified from "../../middlewares/checkUserVerification";
import profileUpdateValidation from "../../validations/profile.update.validation";
import upload from "../../utils/multer";

const route = Router();
route.post("/signup", signupValidation, verifyUser, UserController.register);
route.patch(
  "/profile",
  extractToken,
  upload.single("profilePic"),
  profileUpdateValidation,
  UserController.updateProfile
);
route.post(
  "/login",
  loginValidation,
  authLogin,
  findUser,
  checkIsVerified,
  UserController.login
);
route.get("/verify-email/:token", verifyToken, UserController.verify_email);
route.get("/auth/google", googleAuth);
route.get("/google/callback", googleCallBack, UserController.googleAuth);
route.get("/logout", extractToken, UserController.logout);
route.put(
  "/password-update",
  extractToken,
  passwordValidation,
  checkPass,
  UserController.updatePassword
);
route.post("/password-reset-request", UserController.resetRequest);
route.get("/password-reset/:token", resetData, UserController.getReset);
route.post(
  "/password-reset/:token",
  resetData,
  passwordResetValidation,
  UserController.resetpassword
);

route.get("/", extractToken, checkAdmin, UserController.getUsers);
route.patch(
  "/:id/role",
  extractToken,
  checkAdmin,
  validateRole,
  UserController.assignRole
);
route.post(
  "/:id/update-status",
  extractToken,
  checkAdmin,
  UserController.disableAccount
);
route.post("/:token/auth/validate/", UserController.Validate);

export default route;
