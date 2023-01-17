import { FavoriteHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const createFavorite: FavoriteHandlers["add"] = async (req, res) => {
  try {
    const { userId, videoId } = req.params;
    const favorites = await prisma.user
      .update({
        where: {
          id: userId,
        },
        data: {
          favorites_videos: {
            connect: {
              id: videoId,
            },
          },
        },
      })
      .favorites_videos();

    res.status(201).send(favorites);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default createFavorite;
