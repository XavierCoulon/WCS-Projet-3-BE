/* eslint-disable no-console */
import { UserHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const updateUser: UserHandlers["update"] = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, firstname, imageUrl, lastname, password, role, username } =
      req.body;
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
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
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default updateUser;
