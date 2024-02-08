import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.cookies?.token || req.headers?.authorization;

  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error: any) {
    console.error(error);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
