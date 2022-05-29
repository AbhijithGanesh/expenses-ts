import e, { json, Router, Request, Response, response } from "express";
import type { BaseUser, User } from "../types/users";
import type { User as modelUser } from "@prisma/client";
import { hashSync, genSaltSync, compare, compareSync } from "bcrypt";
import { client } from "../utils/database";
import generate_token from "../plugin/generate";
import { validateToken } from "../plugin/authentication";

const users: Router = Router();
users.use(json());

users.get("/token", async (req: Request, res: Response): Promise<void> => {
  let user_object: User = {
    username: req.body?.username,
    name: req.body?.name,
    email: req.body?.email,
    password: req.body?.password,
  };
  let search_object: modelUser | null = await client.user.findUnique({
    where: {
      email: user_object.email,
    },
  });
  console.log(search_object);
  if (search_object != null) {
    if (compareSync(user_object.password, search_object!.password!) == true) {
      const token_obj = generate_token(user_object);
      await client.token.create({
        data: {
          token: token_obj,
          createdAt: new Date(Date.now()),
          userId: search_object.id,
          valid: true,
        },
      });
      res.status(200).send({ token: token_obj });
    } else {
      res.status(403).send({ Message: "Incorrect Password!" });
    }
  } else {
    res
      .status(404)
      .send({ Message: `User with ${user_object.username}  not found` });
  }
});
users.get(
  "by-id/:id",
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
    password: hashSync(req.body?.password, genSaltSync(10)),
  };
  try {
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
  } catch (PrismaClientUnknownRequestError) {
    res.status(406).send("Object already exists");
  }
});

users.put(
  "/update/:param",
  async (req: Request, res: Response): Promise<void> => {
    let user_object = {
      username: req.body?.username,
      email: req.body?.email,
      name: req.body?.name,
    };

    let obj = await client.user.update({
      where: {
        username: user_object.username,
      },
      data: {
        username: user_object.username,
        name: user_object.name,
        email: user_object.email,
      },
    });
    if (obj) {
      res.status(202).send({
        Message: `Your ${req.params?.param} was updated succesfully. `,
      });
    }
  }
);
users.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  let user_object = await client.user.delete({
    where: { id: Number(req.params.id) },
  });
  if (user_object) {
    res.status(201).send({ Message: "User object was deleted" });
  } else {
    res.status(304).send({ Message: "Not modified" });
  }
});

users.get("/username", async (req: Request, res: Response): Promise<void> => {
  let user_object = await client.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  res.status(200).send(user_object);
});

users.get(
  "/update-password",
  async (req: Request, res: Response): Promise<void> => {
    let obj = await client.user.update({
      where: {
        username: req.body?.username,
      },
      data: {
        password: hashSync(req.body?.password, genSaltSync(10)),
      },
    });
    if (obj) {
      res.status(202).send({
        Message: `Your ${req.params?.param} was updated succesfully. `,
      });
    }
  }
);
export default users;
