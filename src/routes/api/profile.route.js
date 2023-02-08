import { Router } from "express";
import extractToken from "../../middlewares/extractToken";
import checkPass from "../../middlewares/checkpassword";
import ProfileController from "../../controllers/profileController";
import passwordValidation from "../../validations/password.validation";

const router = Router();

router.put(
  "/password-update",
  extractToken,
  checkPass,
  passwordValidation,
  ProfileController.updatePassword
);

export default router;
