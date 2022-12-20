/* eslint-disable no-console */
import bcrypt from "bcrypt";
import { AuthController } from "../interface";
import prisma from "../../../../prisma/client";
import jwt from "jsonwebtoken";

const signIn: AuthController["signIn"] = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(403).json({ message: "Invalid credentiales" });
    }
    const { password: removedPassword, ...userWithoutPassword } = user;
    const secret = process.env.JWT_SECRET || "secret";
    const token = jwt.sign(userWithoutPassword, secret, { expiresIn: "1h" });
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default signIn;
