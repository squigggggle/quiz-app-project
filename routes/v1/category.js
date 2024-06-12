import express from "express";

import { seedCategories } from "../../controllers/v1/seed.js";

const router = express.Router();

router.get("/", seedCategories);

export default router;