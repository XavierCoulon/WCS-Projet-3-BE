import { PageHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const getOnePage: PageHandlers["getOne"] = async (req, res) => {
  try {
    const { id } = req.params;
    const page = await prisma.page.findUniqueOrThrow({
      where: {
        id: id,
      },
    });

    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default getOnePage;
