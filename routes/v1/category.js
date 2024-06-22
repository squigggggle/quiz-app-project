import express from "express";

import { seedCategories } from "../../controllers/v1/seed.js";
import { getCategories } from "../../controllers/v1/category.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/seed", seedCategories);

export default router;