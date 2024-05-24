import axios from "axios";
import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedBasicUsers = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    if (user.role !== "ADMIN_USER") {
      return res.status(403).json({
        msg: "Not authorized to access this route",
      });
    }

    const data = await axios.get(
      "https://gist.githubusercontent.com/Grayson-Orr/693f8678c4cdca98c03a2729f8352ec5/raw"
    );

    data.data.forEach((user) => {
      // Set the user's avatar based off their username
      const avatarLink = "https://api.dicebear.com/8.x/lorelei/svg?seed=" + user.username;
      user.avatar = avatarLink;
      // Create a salt using bcryptjs.genSaltSync()
      const salt = bcryptjs.genSaltSync();
      // Hash the user's password using bcryptjs.hashSync(). Pass in the user's password and the salt
      const hashedPassword = bcryptjs.hashSync(password, salt);
      // Set the user's password to the hashed password
      user.password = hashedPassword;
    });

    // Call the createMany method on the Prisma client and pass in the data
    await prisma.user.createMany({
      data: data.data
    })

    return res
      .status(201)
      .json({ msg: "Basic users successfully created", data: data.data });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export default seedBasicUsers;