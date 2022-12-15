import { ResponseError } from "../../interfaces/interfaces";
import { RequestHandler } from "express";
import { Section_Static } from ".prisma/client";

type SectionStaticBody = {
  title: string;
  description: string;
  isHero: boolean;
};

export interface SectionStaticHandlers {
  getAll: RequestHandler<null, Section_Static[] | ResponseError, null>;
  getOne: RequestHandler<{ id: string }, Section_Static | ResponseError, null>;
  create: RequestHandler<
    null,
    Section_Static | ResponseError,
    SectionStaticBody
  >;
  update: RequestHandler<
    { id: string },
    Section_Static | ResponseError,
    SectionStaticBody
  >;
  delete: RequestHandler<{ id: string }, Section_Static | ResponseError, null>;
}
