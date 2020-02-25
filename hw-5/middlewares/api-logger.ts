import {NextFunction, Request, Response} from 'express';

export const apiLogger = (req: Request, res: Response, next: NextFunction) => {
  const logStr = `[${req.method}] ${req.url}\n Params: ${
      JSON.stringify(req.params)}\n Body: ${JSON.stringify(req.body)}`;

  console.log(logStr);
  next()
};
