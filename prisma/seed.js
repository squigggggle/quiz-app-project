import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs"; 
const prisma = new PrismaClient();

const main = async () => {
  const data = [
    {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "johndoe@gmail.com",
      password: "P@ssw0rd123",
      role: "ADMIN_USER",
    },
    {
      firstName: "Alice",
      lastName: "Smith",
      username: "alicesmith",
      email: "alicesmith@gmail.com",
      password: "@liceP@ss789",
      role: "ADMIN_USER",
    },
    {
      firstName: "Bob",
      lastName: "Johnson",
      username: "bobjohnson",
      email: "bobjohnson@gmail.com",
      password: "B0bP@ssw0rd",
      role: "ADMIN_USER",
    },
    {
      firstName: "Emily",
      lastName: "Brown",
      username: "emilybrown",
      email: "emilybrown@gmail.com",
      password: "Em!ly456P@ss",
      role: "ADMIN_USER",
    },
    {
      firstName: "Michael",
      lastName: "Davis",
      username: "michaeldavis",
      email: "michaeldavis@gmail.com",
      password: "M1ch@elP@ss12",
      role: "ADMIN_USER",
    },
  ]
  try {
    for (const user of data) {
      const avatarLink = "https://api.dicebear.com/8.x/lorelei/svg?seed=" + user.username;
      const salt = bcryptjs.genSaltSync();
      const hashedPassword = bcryptjs.hashSync(user.password, salt);
      await prisma.user.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          avatar: avatarLink,
          password: hashedPassword,
          role: user.role,
        },
      });
    };
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
};

main();
