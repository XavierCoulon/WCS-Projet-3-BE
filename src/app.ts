import Express from "express";
import api from "./api";

const app = Express();

import cors from "cors";
// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: allowedOrigins,
    exposedHeaders: ["content-type", "Authorization"],
    allowedHeaders: ["Authorization", "content-type"],
    credentials: true,
  })
); /* NEW */

app.use(Express.json());

app.use("/api/v1", api);

export default app;
