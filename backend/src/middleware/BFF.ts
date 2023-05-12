import { NextFunction, Request, Response } from "express";

export function bffMiddleware(req: Request, res: Response, next: NextFunction) {
  const apiKey = process.env.API_KEY;
  if (req.headers.authorization === `Bearer ${apiKey}`) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}
