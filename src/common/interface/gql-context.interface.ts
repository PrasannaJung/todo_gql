import { JwtPayload } from './jwt-payload.interface';
import { Request, Response } from 'express';

export interface GqlContext {
  req: Request & { user?: JwtPayload };
  res: Response;
}
