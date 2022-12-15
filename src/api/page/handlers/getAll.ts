import { PageHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const getAllPages: PageHandlers["getAll"] = async (req, res) => {
  try {
    const pages = await prisma.page.findMany();
    res.status(200).json(pages);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default getAllPages;
