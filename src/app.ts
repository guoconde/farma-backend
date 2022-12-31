import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { isCelebrateError } from "celebrate";

import routes from "./routes";

const app = express();

const options: cors.CorsOptions = {
  origin: process.env.ALLOWED_ORIGIN,
};

app.use(cors(options));
app.use(express.json());
app.use(cors());
app.use("/api/v1/", routes);
app.use(express.static("public"));

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.log("err :>> ");
    console.dir(err, { depth: null });

    if (isCelebrateError(err)) {
      const details = Array.from(err.details.values());
      const message = details[0].details[0].message;

      return response.status(400).json({ message });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

export default app;
