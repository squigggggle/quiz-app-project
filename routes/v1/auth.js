import { Router } from "express";

import { register, login } from "../../controllers/v1/auth.js";
import { validatePostBasicUser } from "../../middleware/validation.js";

const router = Router();

router.route("/register").post(validatePostBasicUser, register);
router.route("/login").post(login);

export default router;
