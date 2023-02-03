import express, { Router } from "express";
import passport from "passport";
import userLogin, { UserController } from "../../controllers/userController";
import signupValidation from "../../middlewares/validations/signupValidation";

import userVald from "../../validation/user.vald";

const router = Router();
router.post("/signup", signupValidation, UserController.register);
router.post("/login", userVald, passport.authenticate("local"), userLogin);

export default router;
