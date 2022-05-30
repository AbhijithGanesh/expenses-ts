import { Mode_of_payment } from "@prisma/client";
import { Router, Request, Response } from "express";
import { client } from "../utils/database";

const group: Router = Router();

group.get("/name", async (req: Request, res: Response): Promise<void> => {
  let instance = await client.transaction.groupBy({
    by: ["transaction_name"],
    where: {
      transaction_name: req.body?.name,
    },
  });
  if (instance) {
    res.status(200).send(instance);
  } else {
    res.status(404).send({ Message: "Object was not found" });
  }
});

group.get("/date", async (req: Request, res: Response): Promise<void> => {
  let instance = await client.transaction.groupBy({
    by: ["transaction_date"],
  });
  if (instance) {
    res.status(200).send(instance);
  } else {
    res.status(404).send({ Message: "Object was not found" });
  }
});

group.get("/mode", async (req: Request, res: Response): Promise<void> => {
  let mode_obj: Mode_of_payment | null = await client.mode_of_payment.findFirst(
    {
      where: {
        mode: req.body?.mode,
      },
    }
  );

  let instance = await client.transaction.groupBy({
    by: ["mode_of_paymentId"],
    where: {
      mode_of_paymentId: mode_obj!.id,
    },
  });
  if (instance) {
    res.status(200).send(instance);
  } else {
    res.status(404).send({ Message: "Object was not found" });
  }
});

export default group;
