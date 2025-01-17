
/**
 * @file This file contains the routes for user authentication.
 * @author Jack Young
 */
import { Router } from "express";

import { register, login } from "../../controllers/v1/auth.js";
import { validatePostBasicUser } from "../../middleware/userPostValidation.js";

const router = Router();

router.route("/register").post(validatePostBasicUser, register);
router.route("/login").post(login);

export default router;
