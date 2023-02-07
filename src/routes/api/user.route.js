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
import verifyToken from "../../middlewares/verifyToken";
import checkIsVerified from "../../middlewares/checkUserVerification";

const route = Router();
route.post("/signup", signupValidation, verifyUser, UserController.register);
route.post("/login", loginValidation, checkIsVerified, UserController.login);
route.get("/verify-email/:token", verifyToken, UserController.verify_email);
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
export default route;


