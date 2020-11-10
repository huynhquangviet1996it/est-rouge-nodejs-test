import { Request, Response } from 'express';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

import {
  successResponse,
  unauthorizedResponse,
} from '../modules/common/service';
import { JWT_KEY, USER_INFO } from '../configs/auth-config';

export class AuthController {
  public login(req: Request, res: Response): void {
    if (
      this.validateLogin(req.body).error ||
      req.body.email !== USER_INFO.email ||
      req.body.password !== USER_INFO.password
    ) {
      return unauthorizedResponse('invalid email or password', {}, res);
    }
    const token = jwt.sign(
      {
        username: USER_INFO.username,
        email: USER_INFO.email,
      },
      JWT_KEY
    );
    return successResponse(
      'login successful',
      {
        username: USER_INFO.username,
        email: USER_INFO.email,
        token,
      },
      res
    );
  }

  public validateLogin(body: ILoginBody): Joi.ValidationResult {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    return schema.validate(body);
  }
}

export interface ILoginBody {
  email: string;
  password: string;
}
