import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";

const asyncHandler =
  (
    controllersFn: (
      req: Request | AuthRequest,
      res: Response,
      next: NextFunction
    ) => Promise<void>
  ) =>
  (req: Request | AuthRequest, res: Response, next: NextFunction) => {
    Promise.resolve(controllersFn(req, res, next)).catch(next);
  };

export default asyncHandler;
