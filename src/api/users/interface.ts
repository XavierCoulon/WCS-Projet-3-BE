import { User } from "@prisma/client";
import { RequestHandler } from "express";
import { ResponseError, ResponseValidation } from "../../interfaces/interfaces";

type TUserBody = Omit<User, "id">;

export interface UserHandlers {
  getAll: RequestHandler<null, User[] | ResponseError, null>;
  getOne: RequestHandler<{ id: string }, User | ResponseError, null>;
  create: RequestHandler<null, User | ResponseError, TUserBody>;
  update: RequestHandler<{ id: string }, User | ResponseError, TUserBody>;
  delete: RequestHandler<
    { id: string },
    ResponseValidation | ResponseError,
    null
  >;
}
