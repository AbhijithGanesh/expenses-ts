import { json, Request, Router, Response } from "express";
import type { payments as payment_type } from "../types/payments";

const payments: Router = Router();
payments.use(json());

payments.post("/create", async (req: Request, res: Response): Promise<void> => {
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

export { payments as PaymentRouter };
