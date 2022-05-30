import { json, Request, Router, Response } from "express";
import { validateToken } from "../plugin/authentication";
import { client } from "../utils/database";
import { Mode_of_payment, transaction } from "@prisma/client";
import { Mode } from "../types/Modes";

import type { payments as payment_type } from "../types/payments";
import group from "./payments-analysis";

const payments: Router = Router();
payments.use(json());
payments.use("/reports", validateToken, group);

payments.post(
  "/create",
  validateToken,
  async (req: Request, res: Response): Promise<void> => {
    let instance: payment_type = {
      transaction_id: req.body?.transaction_id,
      transaction_date: new Date(req.body?.date),
      transaction_name: req.body?.name,
      Mode: req.body?.mode as Mode,
    };
    let mode_finder: Mode_of_payment | null =
      await client.mode_of_payment.findUnique({
        where: {
          mode: instance.Mode,
        },
      });
    try {
      let data_inst = await client.transaction.create({
        data: {
          transaction_id: instance.transaction_id,
          transaction_date: instance.transaction_date,
          transaction_name: instance.transaction_name,
          mode_of_paymentId: mode_finder!.id!,
        },
      });
      if (data_inst) {
        res.status(200).send({ Message: "Transaction stored successfully." });
      } else {
        res.status(500).send(data_inst);
      }
    } catch (PrismaClientUnknownRequestError) {
      res.status(406).send({ Message: "Object already exists" });
    }
  }
);

payments.get(
  "/get-by-id/:id",
  validateToken,
  async (req: Request, res: Response): Promise<void> => {
    let instance: transaction | null = await client.transaction.findFirst({
      where: {
        transaction_name: req.params?.id,
      },
    });
    if (instance) {
      res.status(200).send(instance);
    } else {
      res.status(404).send({ Message: "Not found" });
    }
  }
);

payments.patch(
  "/update/date/",
  validateToken,
  async (req: Request, res: Response): Promise<void> => {
    let instance: transaction | null = await client.transaction.update({
      where: {
        transaction_id: req.body?.transaction_id,
      },
      data: {
        transaction_date: new Date(req.body?.date),
      },
    });
    if (instance) {
      res
        .status(202)
        .send({ Message: "Object was updated succesfully", data: instance });
    } else {
      res.status(406).send({ Message: "Object was not updated succesfully" });
    }
  }
);

payments.patch(
  "/update/mode/",
  validateToken,
  async (req: Request, res: Response): Promise<void> => {
    const search_object: Mode_of_payment | null =
      await client.mode_of_payment.findUnique({
        where: {
          mode: req.body?.mode,
        },
      });
    let instance: transaction | null = await client.transaction.update({
      where: {
        transaction_id: req.body?.transaction_id,
      },
      data: {
        mode_of_paymentId: search_object!.id,
      },
    });
    if (instance) {
      res
        .status(202)
        .send({ Message: "Object was updated succesfully", data: instance });
    } else {
      res.status(406).send({ Message: "Object was not updated succesfully" });
    }
  }
);

payments.patch(
  "/update/name/",
  validateToken,
  async (req: Request, res: Response): Promise<void> => {
    let instance: transaction | null = await client.transaction.update({
      where: {
        transaction_id: req.body?.transaction_id,
      },
      data: {
        transaction_name: req.body?.transaction_name,
      },
    });
    if (instance) {
      res
        .status(202)
        .send({ Message: "Object was updated succesfully", data: instance });
    } else {
      res.status(406).send({ Message: "Object was not updated succesfully" });
    }
  }
);

payments.delete(
  "/:tid",
  validateToken,
  async (req: Request, res: Response): Promise<void> => {
    let obj: transaction | null = await client.transaction.findFirst({
      where: { transaction_name: req.params?.tid },
    });
    let instance: transaction | null = await client.transaction.delete({
      where: {
        id: obj!.id,
      },
    });
    if (instance) {
      res.status(200).send(instance);
    } else {
      res.status(404).send({ Message: "Object was not found" });
    }
  }
);

export { payments as PaymentRouter };
