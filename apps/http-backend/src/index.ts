import express from "express";
import jwt from "jsonwebtoken";
import { HTTP_PORT, JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {
  CreateUserSchema,
  SignInSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();
const PORT = HTTP_PORT;

app.post("/signup", (req, res) => {
  const data = CreateUserSchema.safeParse(req.body);
  if (!data.success) {
    return res.status(400).json({ message: data.error.message });
  }
  res.json({
    userId: 1,
  });
});

app.post("/signin", (req, res) => {
  const data = SignInSchema.safeParse(req.body);
  if (!data.success) {
    return res.status(400).json({ message: data.error.message });
  }
  const userId = 1;
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.json({ token });
});

app.post("/room", middleware, (req, res) => {
  const data = CreateRoomSchema.safeParse(req.body);
  if (!data.success) {
    return res.status(400).json({ message: data.error.message });
  }
  // db call
  res.json({
    roomId: 123,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
