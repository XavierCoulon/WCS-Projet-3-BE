import { FavoriteHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const createFavorite: FavoriteHandlers["add"] = async (req, res) => {
  const { id } = req.user;
  try {
    const { videoId } = req.body;
    const favorites = await prisma.user
      .update({
        where: {
          id,
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
