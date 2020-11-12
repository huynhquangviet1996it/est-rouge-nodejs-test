import { Application, Request, Response } from 'express';
import { EventController } from '../controllers/event-controller';
import { auth } from '../middleware/auth';
export class EventRoutes {
  private eventController: EventController = new EventController();

  public route(app: Application): void {
    app.post('/api/event', auth, (req: Request, res: Response) => {
      this.eventController.createEvent(req, res);
    });

    app.get('/api/event', (req: Request, res: Response) => {
      this.eventController.getEvents(req, res);
    });

    app.put('/api/event/:id', auth, (req: Request, res: Response) => {
      this.eventController.updateEvent(req, res);
    });

    app.patch('/api/event/:id', auth, (req: Request, res: Response) => {
      this.eventController.editEvent(req, res);
    });

    app.delete('/api/event/:id', auth, (req: Request, res: Response) => {
      this.eventController.deleteEvent(req, res);
    });
  }
}
