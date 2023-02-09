import { Router } from "express";
import UserController from "../../controllers/userController";
import {authLogin} from "../../middlewares/authVerify";
import signupValidation from "../../validations/signup.validation";
import loginValidation from "../../validations/login.validation";
import verifyUser from "../../middlewares/verifyUser";

const router = Router();
router.post("/signup", signupValidation, verifyUser, UserController.register);
router.post("/login", loginValidation, authLogin, UserController.login);

export default router;
