/* eslint-disable no-console */
import { AdvertisingHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const deleteAdd: AdvertisingHandlers["delete"] = async (req, res) => {
  try {
    const { id } = req.params;
    const advertisingToDelete = await prisma.advertising.delete({
      where: {
        id,
      },
    });
    res
      .status(200)
      .json({ message: `${advertisingToDelete.title} has been deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default deleteAdd;
