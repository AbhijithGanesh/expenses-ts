import { json, Router, Request, Response } from "express";

const users: Router = Router();
users.use(json());

users.get("/:id", async (req: Request, res: Response): Promise<void> => {});
users.post("/create", async (req: Request, res: Response): Promise<void> => {});
users.put("/update", async (req: Request, res: Response): Promise<void> => {});
users.delete("/:id", async (req: Request, res: Response): Promise<void> => {});
users.get(
  "/forget-password",
  async (req: Request, res: Response): Promise<void> => {}
);
users.post(
  "/magic-link",
  async (req: Request, res: Response): Promise<void> => {}
);
export default users;
