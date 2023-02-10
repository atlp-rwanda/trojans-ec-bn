import { Router } from "express";
import UserController from "../../controllers/userController";
import authLogin from "../../utils/passport";
import signupValidation from "../../validations/signup.validation";
import loginValidation from "../../validations/login.validation";
import verifyUser from "../../middlewares/verifyUser";
import passwordValidation from "../../validations/pass.update.validation";
import checkPass from "../../middlewares/checkPass";
import resetData from "../../middlewares/resetData";
import extractToken from "../../middlewares/extractToken";
import passwordResetValidation from "../../validations/pass.reset.validation";

const route = Router();
route.post("/signup", signupValidation, verifyUser, UserController.register);
route.post("/login", loginValidation, authLogin, UserController.login);
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
