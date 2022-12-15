import { PageHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const updatePage: PageHandlers["update"] = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const page = await prisma.page.update({
      where: {
        id: id,
      },
      data: {
        title,
      },
    });
    res.status(201).json(page);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default updatePage;
