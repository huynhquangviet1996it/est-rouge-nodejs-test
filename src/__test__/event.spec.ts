import supertest from 'supertest';
import chai from 'chai';
import jwt from 'jsonwebtoken';

import app from '../app';
import { MongoDatasource } from '../datasources/mongo-datasource';
import EventModel from '../modules/events/schema';
import { JWT_KEY, USER_INFO } from '../configs/auth-config';
import dayjs from 'dayjs';
const request = supertest(app);
const expect = chai.expect;

const token = jwt.sign(
  {
    username: USER_INFO.username,
    email: USER_INFO.email,
  },
  JWT_KEY
);
describe('Event API Routes', () => {
  beforeEach(() => {
    EventModel.deleteMany({}).exec(() => {
      console.log('delete data');
    });
  });
  after(() => {
    const mongo = new MongoDatasource();
    mongo.disconnect();
  });
  describe('POST /api/event', () => {
    it('returns a new event', (done) => {
      const dataRequest = {
        event_name: 'test_new_event',
        start_date: dayjs().toISOString(),
        due_date: dayjs().add(5, 'd').toISOString(),
        description: '',
      };
      request
        .post('/api/event')
        .set('Authorization', token)
        .send(dataRequest)
        .expect(200)
        .end((err, res) => {
          const { body } = res;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { modification_notes, ...expectedData } = body.data;
          expect(expectedData.event_name).equal(dataRequest.event_name);
          expect(expectedData.start_date).equal(dataRequest.start_date);
          expect(expectedData.due_date).equal(dataRequest.due_date);
          expect(expectedData.description).equal(dataRequest.description);
          done(err);
        });
    });

    it('returns a error invalid event', (done) => {
      const dataRequest = {
        start_date: dayjs().toISOString(),
        due_date: dayjs().add(5, 'd').toISOString(),
        description: '',
      };
      request
        .post('/api/event')
        .set('Authorization', token)
        .send(dataRequest)
        .expect(400)
        .end((err) => {
          done(err);
        });
    });

    it('returns a error authorized', (done) => {
      const dataRequest = {
        start_date: dayjs().toISOString(),
        due_date: dayjs().add(5, 'd').toISOString(),
        description: '',
      };
      request
        .post('/api/event')
        .send(dataRequest)
        .expect(401)
        .end((err) => {
          done(err);
        });
    });
  });

  describe('PATCH /api/event/:id', () => {
    it('returns a response edit successful', (done) => {
      const dataRequest = {
        event_name: 'test_edit_event',
        start_date: dayjs().toISOString(),
        due_date: dayjs().add(5, 'd').toISOString(),
        description: '',
        modification_notes: [
          {
            modified_on: dayjs().toISOString(),
            modification_note: 'New event created',
          },
        ],
      };
      EventModel.create(dataRequest, (err, event) => {
        request
          .patch(`/api/event/${event._id}`)
          .set('Authorization', token)
          .send({
            event_name: 'event_name_after_edit',
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body.status).equal('SUCCESS');
            done(err);
          });
      });
    });
  });

  describe('PUT /api/event/:id', () => {
    it('returns a response update successful', (done) => {
      const dataRequest = {
        event_name: 'test_update_event',
        start_date: dayjs().toISOString(),
        due_date: dayjs().add(5, 'd').toISOString(),
        description: '',
        modification_notes: [
          {
            modified_on: dayjs().toISOString(),
            modification_note: 'New event created',
          },
        ],
      };
      EventModel.create(dataRequest, (err, event) => {
        request
          .put(`/api/event/${event._id}`)
          .set('Authorization', token)
          .send({
            event_name: 'test_update_after',
            start_date: dayjs().toISOString(),
            due_date: dayjs().add(5, 'd').toISOString(),
            description: 'this is a sample',
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body.status).equal('SUCCESS');
            done(err);
          });
      });
    });
  });

  describe('DELETE /api/event/:id', () => {
    it('returns a response delete successful', (done) => {
      const dataRequest = {
        event_name: 'test_delete_event',
        start_date: dayjs().toISOString(),
        due_date: dayjs().add(5, 'd').toISOString(),
        description: '',
        modification_notes: [
          {
            modified_on: dayjs().toISOString(),
            modification_note: 'New event created',
          },
        ],
      };
      EventModel.create(dataRequest, (err, event) => {
        request
          .delete(`/api/event/${event._id}`)
          .set('Authorization', token)
          .expect(200)
          .end((err, res) => {
            expect(res.body.status).equal('SUCCESS');
            done(err);
          });
      });
    });
  });

  describe('GET /api/event', () => {
    it('returns a list event with paginate', (done) => {
      const dataRequest = [
        {
          event_name: 'test_get_list_event_1',
          start_date: dayjs().toISOString(),
          due_date: dayjs().add(5, 'd').toISOString(),
          description: '',
          modification_notes: [
            {
              modified_on: dayjs().toISOString(),
              modification_note: 'New event created',
            },
          ],
        },
        {
          event_name: 'test_get_list_event_2',
          start_date: dayjs().subtract(10, 'd').toISOString(),
          due_date: dayjs().subtract(5, 'd'),
          description: '',
          modification_notes: [
            {
              modified_on: dayjs().subtract(10, 'd').toISOString(),
              modification_note: 'New event created',
            },
          ],
        },
        {
          event_name: 'test_get_list_event_3',
          start_date: dayjs().add(1, 'd').toISOString(),
          due_date: dayjs().add(5, 'd').toISOString(),
          description: '',
          modification_notes: [
            {
              modified_on: dayjs().toISOString(),
              modification_note: 'New event created',
            },
          ],
        },
        {
          event_name: 'test_get_list_event_4',
          start_date: dayjs().add(3, 'd').toISOString(),
          due_date: dayjs().add(5, 'd').toISOString(),
          description: '',
          modification_notes: [
            {
              modified_on: dayjs().toISOString(),
              modification_note: 'New event created',
            },
          ],
        },
        {
          event_name: 'test_get_list_event_5',
          start_date: dayjs().add(5, 'd').toISOString(),
          due_date: dayjs().add(10, 'd').toISOString(),
          description: '',
          modification_notes: [
            {
              modified_on: dayjs().toISOString(),
              modification_note: 'New event created',
            },
          ],
        },
      ];
      EventModel.create(dataRequest, () => {
        request
          .get(`/api/event`)
          .query({
            filter: {
              limit: 2,
              offset: 0,
            },
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body.status).equal('SUCCESS');
            expect(res.body.data).has.lengthOf(2);
            done(err);
          });
      });
    });

    it('returns a list event with sort', (done) => {
      const dataRequest = [
        {
          event_name: 'test_get_list_event_1',
          start_date: dayjs().toISOString(),
          due_date: dayjs().add(5, 'd').toISOString(),
          description: '',
          modification_notes: [
            {
              modified_on: dayjs().toISOString(),
              modification_note: 'New event created',
            },
          ],
        },
        {
          event_name: 'test_get_list_event_2',
          start_date: dayjs().subtract(10, 'd').toISOString(),
          due_date: dayjs().subtract(5, 'd'),
          description: '',
          modification_notes: [
            {
              modified_on: dayjs().subtract(10, 'd').toISOString(),
              modification_note: 'New event created',
            },
          ],
        },
        {
          event_name: 'test_get_list_event_3',
          start_date: dayjs().add(1, 'd').toISOString(),
          due_date: dayjs().add(5, 'd').toISOString(),
          description: '',
          modification_notes: [
            {
              modified_on: dayjs().toISOString(),
              modification_note: 'New event created',
            },
          ],
        },
        {
          event_name: 'test_get_list_event_4',
          start_date: dayjs().add(3, 'd').toISOString(),
          due_date: dayjs().add(5, 'd').toISOString(),
          description: '',
          modification_notes: [
            {
              modified_on: dayjs().toISOString(),
              modification_note: 'New event created',
            },
          ],
        },
        {
          event_name: 'test_get_list_event_5',
          start_date: dayjs().add(5, 'd').toISOString(),
          due_date: dayjs().add(10, 'd').toISOString(),
          description: '',
          modification_notes: [
            {
              modified_on: dayjs().toISOString(),
              modification_note: 'New event created',
            },
          ],
        },
      ];
      EventModel.create(dataRequest, () => {
        request
          .get(`/api/event`)
          .query({
            filter: {
              where: {
                due_date: {
                  $gt: dayjs().toISOString(),
                },
              },
              sort: {
                start_date: 'asc',
              },
            },
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body.status).equal('SUCCESS');
            expect(res.body.data).has.lengthOf(4);
            done(err);
          });
      });
    });
  });
});
