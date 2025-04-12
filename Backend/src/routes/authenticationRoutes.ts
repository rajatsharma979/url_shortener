import { Router } from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import authController from "../controllers/authController.js";
import dataValidator from  "../public/validatingLoginSignupData.js";
 

const router = Router();

router.post('/login', dataValidator.validateLoginData, authController.postLogin);

router.post('/signup', dataValidator.validateSignupData, authController.postSignup);

export default router;