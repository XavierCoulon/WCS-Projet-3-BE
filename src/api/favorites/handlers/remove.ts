import { FavoriteHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const removeFavorite: FavoriteHandlers["remove"] = async (req, res) => {
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
            disconnect: {
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

export default removeFavorite;
