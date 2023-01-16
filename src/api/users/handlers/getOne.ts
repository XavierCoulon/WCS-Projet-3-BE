/* eslint-disable no-console */
import { UserHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const getOneUser: UserHandlers["getOne"] = async (req, res) => {
  const { role } = req.user;

  const isGuest = role === "GUEST";
  console.log(req.user);

  try {
    const { id } = req.params;
    const user = await prisma.user.findFirstOrThrow({
      where: { id },
      include: {
        favorites_videos: {
          select: {
            id: true,
            display: true,
            createdAt: true,
            categoryId: true,
            description: true,
            isPublic: true,
            videoUrl: isGuest,
            duration: true,
            nbViews: true,
            teaserUrl: true,
            thumbnailUrl: true,
            title: true,
            updatedAt: true,
          },
        },
      },
    });

    const { password: removedPassword, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default getOneUser;
