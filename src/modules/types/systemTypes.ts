import { Request, Response, NextFunction } from 'express';

export type middlewareInterface = (req: Request,res: Response, next: NextFunction) => void;

export type controllerInterface = {
  [key: string]: (req: Request,res: Response, next: NextFunction) => void
};

export type routerInterface = {
  verb: "get" | "put" | "delete" | "post" | "use";
  url: string;
  method: (req: Request,res: Response, next: NextFunction) => void;
  middlewares?: middlewareInterface[];
}[]

export type pageType = 5|10|20|50;