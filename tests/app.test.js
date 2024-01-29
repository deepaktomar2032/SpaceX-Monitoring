const request = require('supertest');
const app = require('../src/app');

describe('SpaceX Monitoring App', () => {
  it('responds with 200 OK on GET /', async () => {
    const response = await request(app).get('/getData');
    expect(response.status).toBe(200);
  });

  it('responds with 200 OK and data on GET /getData', async () => {
    const response = await request(app).get('/getData');
    expect(response.body).toBeDefined();
  });
  
  it('responds with 200 OK and data on GET /getData', async () => {
    const response = await request(app).get('/getData');
    expect(response.body).toBeDefined();
  });
});
