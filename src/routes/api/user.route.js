import { Router } from "express";
import { UserController } from "../../controllers/userController";
import signupValidation from "../../middlewares/validations/signupValidation";


const router = Router();

router.post('/signup',signupValidation, UserController.register)

export default router;