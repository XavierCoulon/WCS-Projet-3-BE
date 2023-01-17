/* eslint-disable no-console */
import { FavoriteHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const isVideoFavorite: FavoriteHandlers["isFavorite"] = async (req, res) => {
  try {
    const { userId, videoId } = req.params;
    const favoritesVideos = await prisma.user
      .findUniqueOrThrow({
        where: {
          id: userId,
        },
      })
      .favorites_videos();

    const resultat = favoritesVideos.filter((video) => video.id === videoId);

    if (resultat.length > 0) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

// Function if SSR

// const isVideoFavorite: FavoriteHandlers["isFavorite"] = async (req, res) => {
//   try {
//     const { videoId } = req.params;
//     const { id } = req.user;
//     const favoritesVideos = await prisma.user
//       .findUniqueOrThrow({
//         where: {
//           id: id,
//         },
//       })
//       .favorites_videos();

//     const resultat = favoritesVideos.filter((video) => video.id === videoId);

//     if (resultat.length > 0) {
//       res.status(200).json(true);
//     } else {
//       res.status(200).json(false);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error });
//   }
// };

export default isVideoFavorite;
