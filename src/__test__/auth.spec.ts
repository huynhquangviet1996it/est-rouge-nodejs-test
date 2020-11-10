import supertest from 'supertest';
import chai from 'chai';
import jwt from 'jsonwebtoken';

import app from '../app';
import { JWT_KEY, USER_INFO } from '../configs/auth-config';
const request = supertest(app);
const expect = chai.expect;

describe('Auth API Routes', () => {
  describe('POST /api/auth/login', () => {
    it('returns a successful data', (done) => {
      request
        .post('/api/auth/login')
        .send({
          email: USER_INFO.email,
          password: USER_INFO.password,
        })
        .expect(200)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).equal('SUCCESS');
          expect(body.message).equal('login successful');
          const dataFromToken = jwt.verify(res.body.data.token, JWT_KEY);
          expect(dataFromToken.username)
            .equal(body.data.username)
            .equal(USER_INFO.username);
          expect(dataFromToken.email)
            .equal(body.data.email)
            .equal(USER_INFO.email);
          done(err);
        });
    });

    it('returns a unauthorized response', (done) => {
      request
        .post('/api/auth/login')
        .send({
          email: USER_INFO.email,
          password: '123456',
        })
        .expect(401)
        .end((err, res) => {
          const { body } = res;
          const expectResponse = {
            status: 'FAILURE',
            message: 'invalid email or password',
          };
          expect(body.status).equal(expectResponse.status);
          expect(body.message).equal(expectResponse.message);
          done(err);
        });
    });

    it('returns a unauthorized response with invalid email', (done) => {
      request
        .post('/api/auth/login')
        .send({
          email: '',
          password: '123456',
        })
        .expect(401)
        .end((err, res) => {
          const { body } = res;
          const expectResponse = {
            status: 'FAILURE',
            message: 'invalid email or password',
          };
          expect(body.status).equal(expectResponse.status);
          expect(body.message).equal(expectResponse.message);
          done(err);
        });
    });

    it('returns a unauthorized response with invalid password', (done) => {
      request
        .post('/api/auth/login')
        .send({
          email: 'user@user.com',
          password: '',
        })
        .expect(401)
        .end((err, res) => {
          const { body } = res;
          const expectResponse = {
            status: 'FAILURE',
            message: 'invalid email or password',
          };
          expect(body.status).equal(expectResponse.status);
          expect(body.message).equal(expectResponse.message);
          done(err);
        });
    });
  });
});
