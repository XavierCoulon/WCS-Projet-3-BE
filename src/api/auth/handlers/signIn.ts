/* eslint-disable no-console */
import bcrypt from "bcrypt";
import { AuthController } from "../interface";
import prisma from "../../../../prisma/client";
import jwt from "jsonwebtoken";
import Cookies from "cookies";

const signIn: AuthController["signIn"] = async (req, res) => {
  const cookies = new Cookies(req, res, {
    secure: process.env.NODE_ENV === "production",
  });

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
    const token = jwt.sign(userWithoutPassword, secret, { expiresIn: "2h" });

    cookies.set("token", `Bearer ${token}`, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default signIn;
