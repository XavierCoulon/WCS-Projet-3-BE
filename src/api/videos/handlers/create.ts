/* eslint-disable no-console */
import { VideoHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const createVideo: VideoHandlers["create"] = async (req, res) => {
  try {
    const {
      categoryId,
      description,
      display,
      duration,
      isPublic,
      teaserUrl,
      thumbnailUrl,
      title,
      videoUrl,
    } = req.body;
    const videoToCreate = await prisma.video.create({
      data: {
        categoryId,
        description,
        display,
        duration,
        isPublic,
        teaserUrl,
        videoUrl,
        thumbnailUrl,
        title,
      },
    });
    res.status(200).json(videoToCreate);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default createVideo;
