import { Router } from "express";
import UserController from "../../controllers/userController";
import signupValidation from "../../validations/signup.validation";
import loginValidation from "../../validations/login.validation";
import verifyUser from "../../middlewares/verifyUser";
import verifyToken from "../../middlewares/verifyToken";
import checkIsVerified from "../../middlewares/checkUserVerification";

const router = Router();
router.post("/signup", signupValidation, verifyUser, UserController.register);
router.post("/login", loginValidation, checkIsVerified, UserController.login);
router.get("/verify-email/:token", verifyToken, UserController.verify_email);

export default router;
