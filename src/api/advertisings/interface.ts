import { Advertising } from "@prisma/client";
import { RequestHandler } from "express";
import { ResponseError, ResponseValidation } from "../../interfaces/interfaces";

type TAdvertisingBody = Omit<Advertising, "id">;

export interface AdvertisingHandlers {
  getAll: RequestHandler<null, Advertising[] | ResponseError, null>;
  getOne: RequestHandler<{ id: string }, Advertising | ResponseError, null>;
  create: RequestHandler<null, Advertising | ResponseError, TAdvertisingBody>;
  update: RequestHandler<
    { id: string },
    Advertising | ResponseError,
    TAdvertisingBody
  >;
  delete: RequestHandler<
    { id: string },
    ResponseValidation | ResponseError,
    null
  >;
}
