import { Video } from "@prisma/client";
import { RequestHandler } from "express";
import { ResponseError } from "../../interfaces/interfaces";

type TFavorite = {
  videoId?: string;
  userId?: string;
};

export interface FavoriteHandlers {
  add: RequestHandler<TFavorite, Video[] | ResponseError, TFavorite>;
  remove: RequestHandler<TFavorite, Video[] | ResponseError, TFavorite>;
  getAll: RequestHandler<TFavorite, Video[] | ResponseError, null>;
  isFavorite: RequestHandler<TFavorite, boolean | ResponseError, TFavorite>;
}
