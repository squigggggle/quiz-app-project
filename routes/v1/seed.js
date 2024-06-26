
/**
 * @file This file contains the route for seeding basic users.
 * @author Jack Young
 */
import express from "express";

import { seedBasicUsers } from "../../controllers/v1/seed.js";

const router = express.Router();

router.get("/", seedBasicUsers);

export default router;
