import supertest from 'supertest';
import app from '../src/app';

jest.setTimeout(10000);

describe('When application has started', () => {
  it('landing returns success', async () => {
    const response = await supertest(app).get('/');
    expect(response.status).toBe(200);
  });

  it('non-existent route returns 404', async () => {
    const response = await supertest(app).get('/rss/not-found');
    expect(response.status).toBe(404);
  });


});
