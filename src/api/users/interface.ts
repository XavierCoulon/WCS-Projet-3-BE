import { User } from "@prisma/client";
import { RequestHandler } from "express";
import { ResponseError, ResponseValidation } from "../../interfaces/interfaces";

type TUserBody = Omit<User, "id">;
type TUserWithoutPassword = Omit<User, "password">;

export interface UserHandlers {
  getAll: RequestHandler<null, TUserWithoutPassword[] | ResponseError, null>;
  getOne: RequestHandler<
    { id: string },
    TUserWithoutPassword | ResponseError,
    null
  >;
  update: RequestHandler<
    { id: string },
    TUserWithoutPassword | ResponseError,
    TUserBody
  >;
  delete: RequestHandler<
    { id: string },
    ResponseValidation | ResponseError,
    null
  >;
}
