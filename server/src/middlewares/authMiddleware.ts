import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user";
import { Types } from "mongoose";

export interface AuthRequest extends Request {
  user?: {
    name: string;
    email: string;
    _id: string | Types.ObjectId;
  };
}

interface User {
  name: string;
  email: string;
  _id: string | Types.ObjectId;
}

const authUser = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
   
      let token: string;

      token = req.cookies.token;
      if (!token) {
       res.status(401);
       throw new Error("Not authorized, no token provided");
      }
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as JwtPayload;

        if(!decoded) {
            res.status(401);
            throw new Error("Not authorized, invalid token");
        }

        req.user = (await User.findById(decoded.userId).select(
          "-password"
        )) as User;
        next();
      } catch (error) {
        console.error(error);
        res.status(401).json({ msg: "Not authorized, token failed" });
      }
  }
);

export {authUser};
