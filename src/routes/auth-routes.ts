import { Application, Request, Response } from 'express';

import { AuthController } from '../controllers/auth-controller';

export class AuthRoutes {
  private authController: AuthController = new AuthController();
  public route(app: Application): void {
    app.post('/api/auth/login', (req: Request, res: Response) => {
      this.authController.login(req, res);
    });
  }
}
