// ============================================================
// Test Suite: Profile API (Workshop 12 - Testing)
// ทดสอบ API endpoint ด้วย Jest และ Supertest
// ============================================================

// supertest ช่วยส่ง HTTP Request จำลองเข้าไปใน Express App
// โดยไม่ต้องเปิด Server จริง — เหมาะสำหรับ Integration Test
const request = require('supertest');

// import server (http.Server instance) จาก server.js
// เพราะ require.main !== module → server.js จะไม่ listen Port จริง
const server = require('./server');

// ============================================================
// describe() จัดกลุ่ม Test Cases ที่เกี่ยวข้องกัน
// รับ 2 argument:
//   1. ชื่อกลุ่ม (แสดงใน test report)
//   2. callback ที่มี it() อยู่ข้างใน
// ============================================================
describe('ทดสอบ API ส่วนของ Profile', () => {

    // ============================================================
    // it() หรือ test() กำหนด Test Case แต่ละอัน
    // รับ 2 argument:
    //   1. คำอธิบายว่าทดสอบอะไร (ควรเขียนให้ชัดเจน)
    //   2. async callback ที่มีโค้ดทดสอบ
    // ============================================================
    it('ควรคืนค่า Status 200 และข้อมูลครบถ้วนเมื่อเรียก GET /api/profile', async () => {

        // request(server).get('/api/profile') ส่ง GET Request ไปยัง endpoint
        // await รอให้ได้ response กลับมาก่อน
        const response = await request(server).get('/api/profile');

        // ============================================================
        // expect() คือ Assertion ของ Jest
        // ตรวจสอบว่าค่าที่ได้ตรงกับที่คาดหวังหรือไม่
        // ถ้าไม่ตรง → test จะ fail พร้อม error message
        // ============================================================

        // ตรวจสอบ HTTP Status Code ต้องเป็น 200
        expect(response.statusCode).toBe(200);

        // toHaveProperty(key, value) ตรวจสอบว่า response.body มี property นั้น ๆ
        expect(response.body).toHaveProperty('name', 'Sukrit Saeliao');
        expect(response.body).toHaveProperty('role', 'FullStack');

        // ตรวจสอบว่า skills เป็น Array
        expect(Array.isArray(response.body.skills)).toBe(true);
    });
});
