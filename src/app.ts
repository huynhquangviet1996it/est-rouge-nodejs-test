import express from 'express';
import bodyParser from 'body-parser';
import { AuthRoutes } from './routes/auth-routes';
import { EventRoutes } from './routes/event-routes';
import { CommonRoutes } from './routes/common-routes';
import { MongoDatasource } from './datasources/mongo-datasource';

class App {
  public app: express.Application;
  private authRoutes: AuthRoutes = new AuthRoutes();
  private commonRoutes: CommonRoutes = new CommonRoutes();
  private eventRoutes: EventRoutes = new EventRoutes();
  private mongoDatasource: MongoDatasource = new MongoDatasource();
  constructor() {
    this.app = express();
    this.config();
    this.setupRoutes();
    this.mongoDatasource.mongoSetup();
  }
  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private setupRoutes(): void {
    this.authRoutes.route(this.app);
    this.eventRoutes.route(this.app);
    //common router
    this.commonRoutes.route(this.app);
  }
}
export default new App().app;
