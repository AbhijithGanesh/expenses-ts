import { Router, Response, Request } from "express";
import { validateToken } from "../plugin/authentication";

let service: Router = Router();

service.get(
  "/forget-password",
  validateToken,
  async (req: Request, res: Response): Promise<void> => {}
);
service.post(
  "/magic-link",
  validateToken,
  async (req: Request, res: Response): Promise<void> => {}
);

export default service;
