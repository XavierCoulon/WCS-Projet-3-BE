import { ResponseError } from "../../interfaces/interfaces";
import { RequestHandler } from "express";
import { Page } from ".prisma/client";

type PageBody = {
  title: string;
};

export interface PageHandlers {
  getAll: RequestHandler<null, Page[] | ResponseError, null>;
  getOne: RequestHandler<{ id: string }, Page | ResponseError, null>;
  create: RequestHandler<null, Page | ResponseError, PageBody>;
  update: RequestHandler<{ id: string }, Page | ResponseError, PageBody>;
  delete: RequestHandler<{ id: string }, Page | ResponseError, null>;
}
