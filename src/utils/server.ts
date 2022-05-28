import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "dotenv";

config();

const initServer = () => {
  const server: Express = express();

  server.use(cors());
  server.use(helmet());

  server.get("/", (req: Request, res: Response) => {
    res.status(200).send("Welcome to the expense tracker app.");
  });

  server.listen(process.env?.PORT, () => {
    console.log(`server is listening on port ${process.env?.PORT}`);
  });
};

export default initServer;
