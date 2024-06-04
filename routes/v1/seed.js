import express from "express";

import { seedBasicUsers, seedCategories } from "../../controllers/v1/seed.js";

const router = express.Router();

router.get("/", seedBasicUsers);
router.get("/", seedCategories);

export default router;