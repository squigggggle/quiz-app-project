import express from "express";

import { seedBasicUsers } from "../../controllers/v1/seed.js";

const router = express.Router();

router.get("/", seedBasicUsers);

export default router;