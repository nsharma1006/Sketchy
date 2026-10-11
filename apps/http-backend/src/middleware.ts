import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { DecodedPayload } from "./gloabal.js";
import {JWT_PASS} from "@repo/backend-common/config"
import { decode } from "node:punycode";

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  
  let token = req.cookies.JWT_TOKEN || "";
  if (!token || token === "") {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }
  if(!token) return null
  const decoded = jwt.verify(
    token,
    JWT_PASS,
  ) as DecodedPayload;
  console.log(decoded)
  if (decoded) {
    if (decoded.userId) {
      req.userId = decoded.userId;
      console.log("Not failed here")
      next();
    }
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};
