import express from "express";

import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../../controllers/v1/user.js";

const router = express.Router();

router.get("/", getUser);
router.get("/:id", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
