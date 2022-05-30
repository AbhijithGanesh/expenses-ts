import { Mode_of_payment } from "@prisma/client";
import { json, Router, Request, Response } from "express";
import { validateToken } from "../plugin/authentication";
import { Mode } from "../types/Modes";
import { client } from "../utils/database";
import mode_analysis from "./mode-analysis";

const modes: Router = Router();
modes.use("/reports", mode_analysis);
modes.use(json());

modes.get(
  "/get-by-id/:id",
  async (req: Request, res: Response): Promise<void> => {
    let search_object = await client.mode_of_payment.findUnique({
      where: { id: Number(req.params?.id) },
    });
    if (search_object) {
      res.status(200).send({ data: search_object });
    } else {
      res.status(404).send({ Message: "Object not found" });
    }
  }
);
modes.post(
  "/create",
  validateToken,
  async (req: Request, res: Response): Promise<void> => {
    let date_obj: Date = new Date(Date.now());
    let user_obj = await client.user.findUnique({
      where: { username: req.body?.user.username },
    });
    let instance: Mode_of_payment = await client.mode_of_payment.create({
      data: {
        name: req.body?.name,
        mode: req.body?.mode as Mode,
        associated_partner: req.body?.associated_partner,
        createdAt: date_obj,
        userId: user_obj!.id,
      },
    });
    if (instance) {
      res
        .status(200)
        .send({ Message: `Mode with name ${req.body?.mode} was created` });
    }
  }
);
modes.put(
  "/update/name",
  async (req: Request, res: Response): Promise<void> => {
    let instance: Mode_of_payment | null = await client.mode_of_payment.update({
      where: {
        mode: req.body?.mode,
      },
      data: {
        name: req.body?.name,
      },
    });
    if (instance) {
      res.status(202).send({ Message: "Data updated!" });
    } else {
      res.status(406).send({ Message: "Data not updated" });
    }
  }
);
modes.put(
  "/update/partner",
  async (req: Request, res: Response): Promise<void> => {
    let instance: Mode_of_payment | null = await client.mode_of_payment.update({
      where: {
        mode: req.body?.mode,
      },
      data: {
        name: req.body?.partner,
      },
    });
    if (instance) {
      res.status(202).send({ Message: "Data updated!" });
    } else {
      res.status(406).send({ Message: "Data not updated" });
    }
  }
);
modes.put(
  "/update/mode",
  async (req: Request, res: Response): Promise<void> => {
    let instance: Mode_of_payment | null = await client.mode_of_payment.update({
      where: {
        mode: req.body?.mode,
      },
      data: {
        mode: req.body?.mode,
      },
    });
    if (instance) {
      res.status(202).send({ Message: "Data updated!" });
    } else {
      res.status(406).send({ Message: "Data not updated" });
    }
  }
);
modes.delete(
  "/delete-by-id/:id([0-9])",
  async (req: Request, res: Response): Promise<void> => {
    let delete_instance: Mode_of_payment | null =
      await client.mode_of_payment.delete({
        where: { id: Number(req.params?.id) },
      });
    if (delete_instance) {
      res.status(200).send({ Message: "Object was deleted" });
    }
  }
);

export default modes;
