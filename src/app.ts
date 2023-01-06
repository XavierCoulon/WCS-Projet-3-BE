import Express from "express";
import api from "./api";

const app = Express();

import cors from "cors";
// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ["*"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options)); /* NEW */

app.use(Express.json());

app.use("/api/v1", api);

export default app;
