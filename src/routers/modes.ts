import { json, Router, Request, Response } from "express";

const modes: Router = Router();
modes.use(json());

modes.get("/:id", async (req: Request, res: Response): Promise<void> => {});
modes.post("/create", async (req: Request, res: Response): Promise<void> => {});
modes.put("/update", async (req: Request, res: Response): Promise<void> => {});
modes.delete("/:id", async (req: Request, res: Response): Promise<void> => {});
modes.get(
  "/group-data/:id",
  async (req: Request, res: Response): Promise<void> => {}
);

export default modes;
