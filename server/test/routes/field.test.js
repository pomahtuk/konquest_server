import 'babel-polyfill';
import supertest from 'supertest';
import { expect } from 'chai';

import app from '../../app';

describe('"/field" route', () => {
  it('should return a json object', (done) => {
    supertest(app)
      .get('/field')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      // .end(done);
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.be.an('object');

        return done();
      });
  });
});
