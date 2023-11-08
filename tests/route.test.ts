import supertest from 'supertest';
import app from '../src/app';

describe('Rss Api route', () => {

  it('Response code should be 404 on non-existent route', async () => {
    const response = await supertest(app).get('/rss/travel/test');
    expect(response.status).toBe(404);
  });

  it('Uppercase route should return error', async () => {
    const response = await supertest(app).get('/rss/Random-Business-article');
    expect(response.status).toBe(400);
  });

  it('Snake case URL should return error', async () => {
    const response = await supertest(app).get('/rss/Random_Business-article');
    expect(response.status).toBe(400);
  });

  it('Existing data should return 200 with XML response', async () => {
    const response = await supertest(app).get('/rss/travel');
    expect(response.status).toBe(200);
    expect(response.type).toEqual('text/xml');
  });

  it('Data: Should return error on non-existent route', async () => {
    const response = await supertest(app).get('/rss/asdasdqwe/test');
    expect(response.status).toBe(404);
  });

});
