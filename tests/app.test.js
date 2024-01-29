const request = require('supertest');
const app = require('../src/app');

describe('SpaceX Monitoring App', () => {
  it('Responds with 200 OK on GET /getData', async () => {
    const response = await request(app).get('/getData');
    expect(response.status).toBe(200);
  });

  it('Responds with 200 OK and data on GET /getData', async () => {
    const response = await request(app).get('/getData');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
