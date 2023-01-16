import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const secret = process.env.JWT_SECRET || "secret";

  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    req.user = {
      role: "GUEST",
    };
    return next();
  }

  const decodedToken = jwt.verify(token, secret);

  if (typeof decodedToken === "string") {
    throw new Error(decodedToken);
  }
  req.user = decodedToken;

  next();
};

export default checkToken;
