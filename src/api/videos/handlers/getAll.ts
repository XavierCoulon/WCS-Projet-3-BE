/* eslint-disable no-console */
import { VideoHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const getAllVideos: VideoHandlers["getAll"] = async (req, res) => {
  const { favorite } = req.query;
  console.log(req.query);

  try {
    const videos = await prisma.video.findMany({
      select: {
        id: true,
        display: true,
        createdAt: true,
        categoryId: true,
        description: true,
        isPublic: true,
        videoUrl: true,
        duration: true,
        nbViews: true,
        teaserUrl: true,
        thumbnailUrl: true,
        title: true,
        updatedAt: true,
      },
      where: {
        users_favorites: {
          some: {
            id: {
              contains: favorite === "true" ? req.user.id : "",
            },
          },
        },
      },
    });
    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default getAllVideos;
