import { Router, Response, Request } from "express";

let service: Router = Router();

service.get(
  "/forget-password",
  async (req: Request, res: Response): Promise<void> => {}
);
service.post(
  "/magic-link",
  async (req: Request, res: Response): Promise<void> => {}
);

export default service;
