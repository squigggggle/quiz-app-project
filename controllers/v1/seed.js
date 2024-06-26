/**
 * @file This file contains the implementation of the seed functions for basic users and categories.
 * It imports axios, bcryptjs, and PrismaClient from external libraries.
 * The seedBasicUsers function creates basic users by fetching data from an external API and using bcryptjs to hash passwords.
 * The seedCategories function seeds categories by fetching data from an external API and creating category records in the database.
 * @author Jack Young
 */

import axios from "axios";
import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedBasicUsers = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await prisma.user.findUnique({ where: { id: id } });

    if (user.role !== "ADMIN_USER") {
      return res.status(403).json({
        msg: "Not authorized to access this route",
      });
    }

    const data = await axios.get(
      "https://gist.githubusercontent.com/Grayson-Orr/693f8678c4cdca98c03a2729f8352ec5/raw",
    );

    data.data.forEach((user) => {
      // Set the user's avatar based off their username
      const avatarLink =
        "https://api.dicebear.com/8.x/lorelei/svg?seed=" + user.username;
      user.avatar = avatarLink;
      // Create a salt using bcryptjs.genSaltSync()
      const salt = bcryptjs.genSaltSync();
      // Hash the user's password using bcryptjs.hashSync(). Pass in the user's password and the salt
      const hashedPassword = bcryptjs.hashSync(user.password, salt);
      // Set the user's password to the hashed password
      user.password = hashedPassword;
    });

    // Call the createMany method on the Prisma client and pass in the data
    await prisma.user.createMany({
      data: data.data,
    });

    return res
      .status(201)
      .json({ msg: "Basic users successfully created", data: data.data });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const seedCategories = async (req, res) => {
  try {
    const categoryRowCount = await prisma.category.count();
    if (categoryRowCount > 0) {
      return res.status(200).json({
        msg: "Categories already seeded",
      });
    } else {
      const response = await axios.get("https://opentdb.com/api_category.php");
      const categories = response.data.trivia_categories;
      for (let category of categories) {
        const { id, name } = category;
        await prisma.category.create({
          data: { id, name },
        });
      }
      return res.status(200).json({ msg: "Categories successfully seeded" });
    }
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { seedBasicUsers, seedCategories };
