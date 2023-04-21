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
import {
  passwordResetValidation,
  validateResetRequest,
} from "../../validations/pass.reset.validation";
import findUser from "../../middlewares/findUser";
import { googleAuth, googleCallBack } from "../../utils/passport";
import validateRole from "../../validations/role.validation";
import verifyToken from "../../middlewares/verifyToken";
import checkRole from "../../middlewares/checkRole";
import checkIsVerified from "../../middlewares/checkUserVerification";
import profileUpdateValidation from "../../validations/profile.update.validation";
import ProductWishesController from "../../controllers/productWishesController";
import IsUserExist from "../../middlewares/checkUserExist";
import isPasswordExpired from "../../middlewares/isPasswordExpired";
import { uploadSingle } from "../../middlewares/uploadCloud";
import { tokenValidation } from "../../validations/twofactor.validation";
import checkUserStatus from "../../middlewares/checkUserStatus";
import { isUserAuth } from "../../middlewares/isUserAuth";

const route = Router();
route.post("/signup", signupValidation, verifyUser, UserController.register);
route.patch(
  "/profile",
  extractToken,
  isPasswordExpired,
  uploadSingle("profilePic"),
  profileUpdateValidation,
  UserController.updateProfile
);
route.post(
  "/login",
  loginValidation,
  isUserAuth,
  findUser,
  checkUserStatus,
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
route.post(
  "/password-reset-request",
  validateResetRequest,
  UserController.resetRequest
);
route.get("/password-reset/:token", resetData, UserController.getReset);
route.post(
  "/password-reset/:token",
  resetData,
  passwordResetValidation,
  UserController.resetpassword
);

route.get(
  "/",
  extractToken,
  isPasswordExpired,
  checkRole(["admin"]),
  UserController.getUsers
);
route.patch(
  "/:id/role",
  extractToken,
  isPasswordExpired,
  checkRole(["admin"]),
  IsUserExist,
  validateRole,
  UserController.assignRole
);
route.get(
  "/sellers",
  extractToken,
  isPasswordExpired,
  checkRole(["admin", "buyer"]),
  UserController.getSellers
);
route.post(
  "/:id/update-status",
  extractToken,
  isPasswordExpired,
  checkRole(["admin"]),
  IsUserExist,
  UserController.disableAccount
);
route.post("/:token/auth/validate/", tokenValidation, UserController.Validate);

route.get(
  "/:id/productWishes",
  extractToken,
  isPasswordExpired,
  checkRole(["buyer", "admin"]),
  IsUserExist,
  ProductWishesController.getWishProductByUser
);

route.get(
  "/profile",
  extractToken,
  isPasswordExpired,
  checkRole(["buyer", "seller", "admin"]),
  UserController.getProfile
);

export default route;
