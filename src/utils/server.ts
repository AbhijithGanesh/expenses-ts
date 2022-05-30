import express, { Express, Request, Response } from "express";
import cors from "cors";
import { init } from "express-oas-generator";
import redoc from "redoc-express";
import helmet from "helmet";
import service from "./mails";
import { config } from "dotenv";
import router from "../router";
import token from "../routers/tokens";

config();

const initServer = () => {
  const server: Express = express();
  // server.get("/docs/swagger.json", (req, res) => {
  //   res.sendFile("swagger.json", { root: "./" });
  // });
  // server.get(
  //   "/docs",
  //   redoc({
  //     title: "API Docs",
  //     specUrl: "/docs/swagger.json",
  //   })
  // );
  server.use(cors());
  server.use(helmet());
  server.use("/api", router);
  server.use("/access", service);
  server.use("/access-logs", token);
  server.get("/", (req: Request, res: Response) => {
    res.status(200).send("Welcome to the expense tracker app.");
  });

  server.listen(process.env?.PORT, () => {
    console.log(`server is listening on port ${process.env?.PORT}`);
  });
  init(server);
};

export default initServer;
