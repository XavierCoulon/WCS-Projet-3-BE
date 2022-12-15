import { Video } from "@prisma/client";
import { RequestHandler } from "express";
import { ResponseError, ResponseValidation } from "../../interfaces/iterfaces";

type TVideoBody = Omit<Video, "id" | "createdDate" | "updatedDate" | "nbViews">;

export interface VideoHandlers {
  getAll: RequestHandler<null, Video[] | ResponseError, null>;
  getOne: RequestHandler<{ id: string }, Video | ResponseError, null>;
  create: RequestHandler<null, Video | ResponseError, TVideoBody>;
  update: RequestHandler<{ id: string }, Video | ResponseError, TVideoBody>;
  delete: RequestHandler<
    { id: string },
    ResponseValidation | ResponseError,
    null
  >;
}
