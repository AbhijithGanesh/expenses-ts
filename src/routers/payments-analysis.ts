import { Router, Request, Response } from "express";
import { client } from "../utils/database";

const group: Router = Router();

group.get("/name", async (req: Request, res: Response): Promise<void> => {
  let instance = await client.transaction.findMany({
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
  let instance = await client.transaction.findMany({
    where: {
      transaction_date: new Date(req.body?.date),
    },
  });
  if (instance) {
    res.status(200).send(instance);
  } else {
    res.status(404).send({ Message: "Object was not found" });
  }
});

group.get("/mode", async (req: Request, res: Response): Promise<void> => {
  let mode = await client.transaction.findUnique({
    where: { id: req.body?.Mode },
  });
  let instance = await client.transaction.findMany({
    where: {
      mode_of_paymentId: mode!.id,
    },
  });
  if (instance) {
    res.status(200).send(instance);
  } else {
    res.status(404).send({ Message: "Object was not found" });
  }
});

export default group;
