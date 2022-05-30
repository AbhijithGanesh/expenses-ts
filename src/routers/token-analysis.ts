import { Token, User } from "@prisma/client";
import { Request, Router, Response } from "express";
import { client } from "../utils/database";

const analysis: Router = Router();

analysis.use(
  "/username",
  async (req: Request, res: Response): Promise<void> => {
    let user = await client.user.findUnique({
      where: {
        username: req.body?.username,
      },
      select: {
        id: true,
      },
    });
    let search_object = await client.token.findMany({
      where: {
        userId: user!.id,
      },
    });
    if (search_object) {
      res.status(200).send(search_object);
    } else {
      res.status(404).send({ Message: "Object was not found" });
    }
  }
);

export default analysis;
