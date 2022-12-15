/* eslint-disable no-console */
import { AdvertisingHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const createAdd: AdvertisingHandlers["create"] = async (req, res) => {
  try {
    const { description, imageUrl, linkTo, title } = req.body;
    const advertisingToCreate = await prisma.advertising.create({
      data: {
        description,
        imageUrl,
        linkTo,
        title,
      },
    });
    res.status(200).json(advertisingToCreate);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default createAdd;
