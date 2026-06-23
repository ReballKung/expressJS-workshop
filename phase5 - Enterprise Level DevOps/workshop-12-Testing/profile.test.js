const request = require('supertest');
const server = require('./server');

describe('ทดสอบ API ส่วนของ Profile', () => {
    it('ควรคืนค่า Status 200 และข้อมูลครบถ้วนเมื่อเรียก GET /api/profile', async () => {
        const response = await request(server).get('/api/profile');

        expect(response.statusCode).toBe(200);

        expect(response.body).toHaveProperty('name', 'Sukrit Saeliao');

        expect(response.body).toHaveProperty('role', 'FullStack');

        expect(Array.isArray(response.body.skills)).toBe(true);
    });
});