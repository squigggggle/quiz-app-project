import express from "express";

import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../../controllers/v1/user.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/current", getUser);
router.put("/", updateUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
