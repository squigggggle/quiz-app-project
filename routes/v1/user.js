/**
 * @file This file contains the routes for user-related operations.
 * @author Jack Young
 */

import express from "express";

import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../../controllers/v1/user.js";

import { validatePutBasicUser } from "../../middleware/userPutValidation.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/current", getUser);
router.get("/:id", getUser);
router.put("/", validatePutBasicUser, updateUser);
router.put("/:id", validatePutBasicUser, updateUser);
router.delete("/:id", deleteUser);

export default router;
