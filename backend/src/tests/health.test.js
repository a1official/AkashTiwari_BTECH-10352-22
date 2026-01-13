const request = require('supertest');
const app = require('../app');

describe('Health Check', () => {
    it('should return welcome message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Welcome to Task Management API');
    });
});
