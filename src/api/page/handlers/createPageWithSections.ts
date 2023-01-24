import { Page } from ".prisma/client";
import { PageHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const createPageWithSections: PageHandlers["createWithSections"] = async (
  req,
  res
) => {
  try {
    const {
      title,
      pagesSectionsStatic,
      pagesSectionsDynamic,
      pagesAdvertisings,
    } = req.body;
    const newPage = await prisma.page.create({
      data: {
        title,
        pagesSectionsStatic: {
          connect: pagesSectionsStatic?.map((item) => ({ id: item.id })) || [],
        },
        pagesSectionsDynamic: {
          connect: pagesSectionsDynamic?.map((item) => ({ id: item.id })) || [],
        },
        pagesAdvertisings: {
          connect: pagesAdvertisings?.map((item) => ({ id: item.id })) || [],
        },
      },
    });
    res.status(201).json(newPage);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default createPageWithSections;
