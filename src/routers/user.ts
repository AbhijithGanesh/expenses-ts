import { json, Router, Request, Response, response } from "express";
import type { BaseUser, User } from "../types/users";
import { client } from "../utils/database";
import generate_token from "../plugin/generate";
import { validateToken } from "../plugin/authentication";

const users: Router = Router();
users.use(json());

users.get("/token", async (req: Request, res: Response): Promise<void> => {
  let user_object: BaseUser = {
    username: req.body?.username,
    name: req.body?.name,
    email: req.body?.email,
  };
  let search_object = await client.user.findFirst({
    where: {
      username: user_object.username,
      name: user_object.name,
      email: user_object.email,
    },
  });
  if (search_object) {
    res.status(200).send({ token: generate_token(user_object) });
  } else {
    res
      .status(404)
      .send({ Message: `User with ${user_object.username}  not found` });
  }
});
users.get(
  "/:id",
  validateToken,
  async (req: Request, res: Response): Promise<void> => {
    let search_object = await client.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (search_object) {
      res.status(200).send({ Message: search_object });
    } else {
      res.status(404).send({ Message: "User not found" });
    }
  }
);
users.post("/create", async (req: Request, res: Response): Promise<void> => {
  let user_object: User = {
    username: req.body?.username,
    name: req.body?.name,
    email: req.body?.email,
    password: req.body?.password,
  };
  let obj = await client.user.create({
    data: user_object,
  });
  if (obj) {
    res.status(200).send({ message: "Object created succesfully." });
  } else {
    res.status(400).send({
      message: `Object with username ${user_object.username} was not created.`,
    });
  }
});

users.put("/update", async (req: Request, res: Response): Promise<void> => {});
users.delete("/:id", async (req: Request, res: Response): Promise<void> => {});
users.get(
  "/forget-password",
  async (req: Request, res: Response): Promise<void> => {}
);
users.post(
  "/magic-link",
  async (req: Request, res: Response): Promise<void> => {}
);
export default users;
