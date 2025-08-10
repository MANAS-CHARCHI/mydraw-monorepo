import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export function middleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1] ?? "";
  const decode = jwt.verify(token, JWT_SECRET);
  //   @ts-ignore
  if (decode.userId) {
    //   @ts-ignore
    req.userId = decode.userId;
    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
}
