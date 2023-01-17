/* eslint-disable no-console */
import { FavoriteHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const getAllVideos: FavoriteHandlers["getAll"] = async (req, res) => {
  const { id } = req.user;

  try {
    const favoritesVideos = await prisma.user
      .findUniqueOrThrow({
        where: {
          id,
        },
      })
      .favorites_videos();

    res.status(200).json(favoritesVideos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default getAllVideos;
