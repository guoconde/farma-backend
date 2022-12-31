import "reflect-metadata";
import "dotenv/config";

import "./config/module-alias";
import "./container";
import { prisma } from "./database/prismaClient";

const start = async () => {
  try {
    await prisma.$connect();
    const app = (await import("./app")).default;

    app.listen(process.env.PORT || 3333, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("error :>> ", error);
  }
};

start();
