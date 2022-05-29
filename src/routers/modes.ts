import { Mode_of_payment } from "@prisma/client";
import { json, Router, Request, Response } from "express";
import { Mode } from "../types/Modes";
import { client } from "../utils/database";

const modes: Router = Router();
modes.use(json());

modes.get("/:id", async (req: Request, res: Response): Promise<void> => {
  let search_object = await client.mode_of_payment.findUnique({
    where: { id: Number(req.params?.id) },
  });
  if (search_object) {
    res.status(200).send({ data: search_object });
  } else {
    res.status(404).send({ Message: "Object not found" });
  }
});
modes.post("/create", async (req: Request, res: Response): Promise<void> => {
  let date_obj: Date = new Date(Date.now());
  let instance: Mode_of_payment = await client.mode_of_payment.create({
    data: {
      name: req.body?.name,
      mode: req.body?.mode as Mode,
      associated_partner: req.body?.associated_partner,
      createdAt: date_obj,
      userId: req.body?.user.userId,
    },
  });
  if (instance) {
    res
      .status(200)
      .send({ Message: `Mode with name ${req.body?.mode} was created` });
  }
});
modes.put("/update", async (req: Request, res: Response): Promise<void> => {});
modes.delete(
  "/:id([0-9])",
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
modes.get(
  "/group-data/:id",
  async (req: Request, res: Response): Promise<void> => {}
);

export default modes;
