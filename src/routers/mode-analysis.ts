import { Router, Request, Response } from "express";
import { client } from "../utils/database";
import { User } from "@prisma/client";
// mode: req.body?.mode as Mode,
// associated_partner: req.body?.associated_partner
// userId: user_obj!.id

const mode_analysis: Router = Router();

mode_analysis.get(
  "/mode",
  async (req: Request, res: Response): Promise<void> => {
    let user_obj: User | null = await client.user.findUnique({
      where: {
        username: req.body?.username,
      },
    });
    let obj = await client.mode_of_payment.groupBy({
      by: ["mode"],
      where: {
        userId: user_obj!.id,
      },
    });
    if (obj) {
      res.status(200).send(obj);
    } else {
      res.status(404).send({ Message: "Mode not established." });
    }
  }
);

mode_analysis.get(
  "/partner",
  async (req: Request, res: Response): Promise<void> => {
    let user_obj: User | null = await client.user.findUnique({
      where: {
        username: req.body?.username,
      },
    });
    let obj = await client.mode_of_payment.groupBy({
      by: ["associated_partner"],
      where: {
        userId: user_obj!.id,
      },
    });
    if (obj) {
      res.status(200).send(obj);
    } else {
      res.status(404).send({ Message: "Mode not established." });
    }
  }
);

mode_analysis.get(
  "/user",
  async (req: Request, res: Response): Promise<void> => {
    let user_obj: User | null = await client.user.findUnique({
      where: {
        username: req.body?.username,
      },
    });
    let obj = await client.mode_of_payment.groupBy({
      by: ["userId"],
      where: {
        userId: user_obj!.id,
      },
    });
    if (obj) {
      res.status(200).send(obj);
    } else {
      res.status(404).send({ Message: "Mode not established." });
    }
  }
);

export default mode_analysis;
