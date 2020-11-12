import jwt from 'jsonwebtoken';
import { JWT_KEY, USER_INFO } from '../configs/auth-config';
import { NextFunction, Request, Response } from 'express';
import { unauthorizedResponse } from '../modules/common/service';

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, JWT_KEY);
    if (
      data?.username !== USER_INFO.username ||
      data?.email !== USER_INFO.email
    ) {
      throw new Error('Not authorized to access this resource');
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.user = data;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.token = token;
    next();
  } catch (error) {
    unauthorizedResponse(
      'Not authorized to access this resource',
      new Error('Not authorized to access this resource'),
      res
    );
  }
};
