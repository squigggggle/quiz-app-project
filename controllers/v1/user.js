import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await prisma.user.findUnique({ where: { id: id } });

    /**
     * If the authenticated user is not an admin, they can
     * not create a new record
     */

    if (user.role !== "ADMIN_USER") {
      return res.status(403).json({
        msg: "Not authorized to access this route",
      });
    }

    const users = await prisma.user.findMany();

    if (users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }

    return res.json({ data: users });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    if (!user) {
      return res
        .status(404)
        .json({ msg: `No user with the id: ${req.params.id} found` });
    }

    return res.json({
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json") {
      return res.status(400).json({
        msg: "Invalid Content-Type. Expected application/json.",
      });
    }

    let user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    if (user.role == "ADMIN_USER") {
      return res.status(403).json({
        msg: "Not authorized to edit admin user information",
      });
    }

    if (!user) {
      return res
        .status(404)
        .json({ msg: `No user with the id: ${req.params.id} found` });
    }

    user = await prisma.user.update({
      where: { id: req.params.id },
      data: { ...req.body },
    });

    return res.json({
      msg: `User with the username: ${user.username} successfully updated`,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.user;
    const currentUser = await prisma.user.findUnique({ where: { id: id } });
    
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    if (currentUser.id == user.id) {
      return res
      .status(403)
      .json({msg: `Deleting your account is not allowed`})
    }

    if (user.role == "ADMIN_USER") {
      return res
      .status(403)
      .json({msg: `Deleting an admin account is not allowed`})
    }

    if (!user) {
      return res
        .status(404)
        .json({ msg: `No user with the id: ${req.params.id} found` });
    }

    await prisma.user.delete({
      where: { id: req.params.id },
    });

    return res.json({
      msg: `User with the username: ${user.username} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { getUsers, getUser, updateUser, deleteUser };
