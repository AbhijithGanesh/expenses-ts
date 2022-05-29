import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import service from "./mails";
import { config } from "dotenv";
import router from "../router";
import token from "../routers/tokens";

config();

const initServer = () => {
  const server: Express = express();

  server.use(cors());
  server.use(helmet());
  server.use("/api", router);
  server.use("/access", service);
  server.use("/checks", token);
  server.get("/", (req: Request, res: Response) => {
    res.status(200).send("Welcome to the expense tracker app.");
  });

  server.listen(process.env?.PORT, () => {
    console.log(`server is listening on port ${process.env?.PORT}`);
  });
};

export default initServer;
