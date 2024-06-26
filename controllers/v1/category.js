/**
 * @file This file contains the controller for handling category-related operations.
 * @author Jack Young
 */

import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({});

    if (categories.length === 0) {
      return res.status(404).json({ msg: "No categories found" });
    }

    return res.json({ data: categories });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { getCategories };
