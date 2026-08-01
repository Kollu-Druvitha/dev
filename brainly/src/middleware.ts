import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header missing",
      });
    }
    // Remove "Bearer "
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    //@ts-ignore
    req.userId = (decoded as any).id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};