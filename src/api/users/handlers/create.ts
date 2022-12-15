/* eslint-disable no-console */
import { UserHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const createUser: UserHandlers["create"] = async (req, res) => {
  try {
    const { email, firstname, imageUrl, lastname, password, role, username } =
      req.body;
    const userToCreate = await prisma.user.create({
      data: {
        email,
        firstname,
        imageUrl,
        lastname,
        password,
        role,
        username,
      },
    });
    res.status(200).json(userToCreate);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default createUser;
