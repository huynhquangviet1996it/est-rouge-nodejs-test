import supertest from 'supertest';

import app from '../src/app';
const request = supertest(app);

describe('Commont API Routes', () => {
  describe('GET /api/test', () => {
    it('returns status 404 when route endpoint is not found', (done) => {
      request
        .get('/api/test')
        .expect(404)
        .end((err) => {
          done(err);
        });
    });
  });
});
