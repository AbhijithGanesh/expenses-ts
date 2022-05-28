import { json, Request, Router, Response } from "express";
import type { User } from "../types/users";

const payments: Router = Router();
payments.use(json());

payments.get("/create", async (req: Request, res: Response): Promise<void> => {
  console.log(req.headers);
  res.status(200).send("Created");
});
payments.get("/:id", async (req: Request, res: Response): Promise<void> => {});
payments.put(
  "/update/:id",
  async (req: Request, res: Response): Promise<void> => {}
);
payments.delete(
  "/:tid",
  async (req: Request, res: Response): Promise<void> => {}
);

export default payments;
