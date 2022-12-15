/* eslint-disable no-console */
import { VideoHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const deleteVideo: VideoHandlers["delete"] = async (req, res) => {
  try {
    const { id } = req.params;
    const videoToDelete = await prisma.video.delete({
      where: {
        id,
      },
    });
    res
      .status(200)
      .json({ message: `${videoToDelete.title} has been deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default deleteVideo;
