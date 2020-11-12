import { Request, Response } from 'express';
import {
  insufficientParameters,
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../modules/common/service';
import { IEvent } from '../modules/events/model';
import EventService from '../modules/events/service';
import Joi = require('joi');
import dayjs from 'dayjs';

export class EventController {
  private eventService: EventService = new EventService();

  public async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const validate = this.validateCreateEvent(req.body);
      if (!validate.error) {
        const eventParams: IEvent = {
          event_name: req.body.event_name,
          start_date: req.body.start_date,
          due_date: req.body.due_date,
          description: req.body?.description,
          modification_notes: [
            {
              modified_on: dayjs().toISOString(),
              modification_note: 'New event created',
            },
          ],
        };
        const eventData = await this.eventService.createEvent(eventParams);
        successResponse('create event successful', eventData, res);
      } else {
        // error response if some fields are missing in request body
        insufficientParameters('', validate.errors, res);
      }
    } catch (e) {
      internalServerErrorResponse(e.message, e, res);
    }
  }

  public async getEvents(req: Request, res: Response): Promise<void> {
    try {
      let filter = req.query.filter || {};
      if (filter && typeof filter !== 'object') {
        filter = {};
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { where, field, ...otherFilter } = filter || {};
      const result = await this.eventService.filterEvent(
        where,
        field,
        otherFilter
      );
      successResponse('get event successful', result, res);
    } catch (e) {
      internalServerErrorResponse(e.message, e, res);
    }
  }

  public async editEvent(req: Request, res: Response): Promise<void> {
    try {
      if (req.params.id && !this.validateEditEvent(req.body).errors) {
        const eventData = await this.eventService.findById(req.params.id);
        if (!eventData) {
          notFoundResponse(
            'Event not found',
            new Error('Event not found'),
            res
          );
        }
        eventData.modification_notes.push({
          modified_on: dayjs().toISOString(),
          modification_note: 'event data edited',
        });
        const eventParams: IEvent = {
          ...req.body,
          _id: req.params.id,
          modification_notes: eventData.modification_notes,
        };
        await this.eventService.updateEvent(eventParams);
        successResponse('edit event successful', null, res);
      } else {
        insufficientParameters('', [], res);
      }
    } catch (e) {
      internalServerErrorResponse(e.message, e, res);
    }
  }

  public async updateEvent(req: Request, res: Response): Promise<void> {
    try {
      if (req.params.id && !this.validateUpdateEvent(req.body).errors) {
        const eventData = await this.eventService.findById(req.params.id);
        if (!eventData) {
          notFoundResponse(
            'Event not found',
            new Error('Event not found'),
            res
          );
        }
        eventData.modification_notes.push({
          modified_on: dayjs().toISOString(),
          modification_note: 'event data edited',
        });
        const eventParams: IEvent = {
          event_name: req.body.event_name,
          start_date: req.body.start_date,
          due_date: req.body.due_date,
          description: req.body?.description,
          modification_notes: eventData.modification_notes,
        };
        await this.eventService.updateEvent(eventParams);
        successResponse('update event successful', null, res);
      } else {
        insufficientParameters('', [], res);
      }
    } catch (e) {
      internalServerErrorResponse(e.message, e, res);
    }
  }

  public async deleteEvent(req: Request, res: Response): Promise<void> {
    try {
      if (req.params.id) {
        await this.eventService.deleteEvent(req.params.id);
        successResponse('delete event successful', null, res);
      } else {
        insufficientParameters('', [], res);
      }
    } catch (e) {
      internalServerErrorResponse(e.message, e, res);
    }
  }

  public validateCreateEvent(body: IEvent): Joi.ValidationResult {
    const schema = Joi.object({
      event_name: Joi.string().required(),
      start_date: Joi.date().required(),
      due_date: Joi.date().required(),
      description: Joi.string().allow(null, ''),
    });
    return schema.validate(body);
  }

  public validateEditEvent(body: IEvent): Joi.ValidationResult {
    const schema = Joi.object({
      event_name: Joi.string().allow(null),
      start_date: Joi.date().allow(null),
      due_date: Joi.date().allow(null),
      description: Joi.string().allow(null, ''),
    });
    return schema.validate(body);
  }

  public validateUpdateEvent(body: IEvent): Joi.ValidationResult {
    const schema = Joi.object({
      event_name: Joi.string().required(),
      start_date: Joi.date().required(),
      due_date: Joi.date().required(),
      description: Joi.string(),
    });
    return schema.validate(body);
  }
}
