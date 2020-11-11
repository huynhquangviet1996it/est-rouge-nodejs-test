import mongoose from 'mongoose';
import { DB_NAME, DB_PASS, DB_USER } from '../configs/mongo-config';

export class MongoDatasource {
  public mongoUrl = `mongodb://${DB_USER}:${DB_PASS}@localhost/${DB_NAME}`;

  constructor(mongoUrl?: string) {
    this.mongoUrl = mongoUrl ?? this.mongoUrl;
  }

  public mongoSetup(): void {
    mongoose.connect(this.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }

  public disconnect(): void {
    mongoose.disconnect();
  }
}
