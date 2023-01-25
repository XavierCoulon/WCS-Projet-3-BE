import { ResponseError } from "../../interfaces/interfaces";
import { RequestHandler } from "express";
import { Page } from ".prisma/client";

type PageBody = {
  title: string;
  pagesSectionsStatic?: {
    id: string;
  }[];
  pagesSectionsDynamic?: {
    id: string;
  }[];
  pagesAdvertisings?: {
    id: string;
  }[];
};

type PageBodyWithSections = {
  title: string;
  pagesSectionsStaticData?: {
    id: string;
    position: number;
    status?: boolean;
    pageId?: string;
  }[];
  pagesSectionsDynamicData?: {
    id: string;
    position: number;
    status?: boolean;
    pageId?: string;
  }[];
  pagesAdvertisingsData?: {
    id: string;
    position: number;
    status?: boolean;
    pageId?: string;
  }[];
};

export interface PageHandlers {
  getAll: RequestHandler<null, Page[] | ResponseError, null>;
  getOne: RequestHandler<{ id: string }, Page | ResponseError, null>;
  create: RequestHandler<null, Page | ResponseError, PageBody>;
  update: RequestHandler<{ id: string }, Page | ResponseError, PageBody>;
  delete: RequestHandler<{ id: string }, Page | ResponseError, null>;
  createWithSections: RequestHandler<
    null,
    Page | ResponseError,
    PageBodyWithSections
  >;
}
