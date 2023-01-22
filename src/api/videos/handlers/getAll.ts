/* eslint-disable no-console */
import { VideoHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const getAllVideos: VideoHandlers["getAll"] = async (req, res) => {
  const { role } = req.user;
  const { favorite } = req.query;
  console.log(req.query);

  const isGuest = role === "GUEST";
  try {
    const videos =
      favorite === "true"
        ? await prisma.video.findMany({
            select: {
              id: true,
              display: true,
              createdAt: true,
              categoryId: true,
              description: true,
              isPublic: true,
              videoUrl: !isGuest, // replace by true for testing back-office links
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
          })
        : await prisma.video.findMany({
            select: {
              id: true,
              display: true,
              createdAt: true,
              categoryId: true,
              description: true,
              isPublic: true,
              videoUrl: !isGuest, // replace by true for testing back-office links
              duration: true,
              nbViews: true,
              teaserUrl: true,
              thumbnailUrl: true,
              title: true,
              updatedAt: true,
            },
          });

    res.status(200).json(videos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default getAllVideos;
