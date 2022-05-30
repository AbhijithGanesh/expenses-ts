import type { Token } from "@prisma/client";
import { Request, Router, Response } from "express";
import { validateToken } from "../plugin/authentication";
import { client } from "../utils/database";
import analysis from "./token-analysis";

let token: Router = Router();
token.use("/reports", validateToken, analysis);

token.get(
  "/:id",
  validateToken,
  async (req: Request, res: Response): Promise<void> => {
    let search_object: Token | null = await client.token.findUnique({
      where: {
        id: Number(req.params?.id),
      },
    });
    if (search_object) {
      let user_object = await client.user.findUnique({
        where: {
          id: search_object.id,
        },
        select: {
          username: true,
          name: true,
        },
      });

      res.status(200).send({ data: search_object, user_details: user_object });
    } else {
      res.status(404).send({ Message: "Object not found" });
    }
  }
);

export default token;
