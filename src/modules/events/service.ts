import { IEvent } from './model';
import Events from './schema';

export default class EventService {
  public async createEvent(eventParams: IEvent): Promise<IEvent> {
    return new Promise<IEvent>((resolve, reject) => {
      const _session = new Events(eventParams);
      _session.save((err, product) => {
        if (err) {
          return reject(err);
        }
        return resolve(product);
      });
    });
  }

  public async filterEvent(
    // eslint-disable-next-line @typescript-eslint/ban-types
    where: object = {},
    // eslint-disable-next-line @typescript-eslint/ban-types
    field: object = {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    otherFilter: any = {}
  ): Promise<IEvent[]> {
    return new Promise((resolve, reject) => {
      Events.find(
        where,
        field,
        {
          ...otherFilter,
          ...(otherFilter.limit
            ? {
                limit: parseInt(otherFilter.limit),
              }
            : {}),
          ...(otherFilter.skip
            ? {
                skip: parseInt(otherFilter.skip),
              }
            : {}),
        },
        (err, res) => {
          if (err) {
            return reject(err);
          }
          return resolve(res);
        }
      );
    });
  }

  public findById(_id: string): Promise<IEvent> {
    return new Promise<IEvent>((resolve, reject) => {
      Events.findById(_id, (err: Error | null, eventResult: IEvent) => {
        if (err) {
          return reject(err);
        }
        return resolve(eventResult);
      });
    });
  }

  public async updateEvent(eventParams: IEvent): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const query = { _id: eventParams._id };
      Events.findOneAndUpdate(query, eventParams, (err: Error | null) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async deleteEvent(_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      Events.findByIdAndDelete(_id, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });
  }
}
