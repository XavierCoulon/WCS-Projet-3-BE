/* eslint-disable no-console */
import { VideoHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const getAllVideos: VideoHandlers["getAll"] = async (req, res) => {
  try {
    const { id } = req.user;
    const videos: any = await prisma.video.findMany({
      where: {
        favorites: {
          some: {
            userId: id,
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
