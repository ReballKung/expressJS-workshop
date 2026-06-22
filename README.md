# ExpressJS Workshop

การเรียนรู้การสร้าง REST API ด้วย Express.js ตั้งแต่พื้นฐานจนถึงระบบ Authentication โดยแบ่งเป็น 3 Phase

---

## โครงสร้างโปรเจกต์

```
expressJs/
├── phase1 - startUp ExpressJS/
│   ├── workshop-1-startup/          # Express เบื้องต้น + REST API
│   ├── workshop-2-error&middleware/  # Middleware & Error Handling
│   └── workshop-3-mvc/              # MVC Pattern
│
├── phase2 - Database/
│   ├── workshop-4-database/         # เชื่อมต่อ MySQL Database
│   └── workshop-5-validate/         # Validation
│
└── phase3 - Authentication/
    ├── workshop-6-password-hashing/  # Password Hashing ด้วย bcrypt
    └── workshop-7-JWT/               # JWT Authentication
```

---

## Phase 1 — StartUp ExpressJS

### Workshop 1: Express เบื้องต้น
- สร้าง Express server
- กำหนด Route GET / POST
- ส่ง JSON response

### Workshop 2: Middleware & Error Handling
- สร้าง Custom Middleware สำหรับ logging
- จัดการ Error และ 404 Not Found
- เข้าใจ `req`, `res`, `next`

### Workshop 3: MVC Pattern
- แยก Route และ Controller ออกจากกัน
- โครงสร้างโฟลเดอร์แบบ MVC
- จัดการ API Profile และ Skills

---

## Phase 2 — Database

### Workshop 4: Database
- เชื่อมต่อ MySQL ด้วย `mysql2`
- ใช้ Docker Compose รัน MySQL
- CRUD ผ่าน API

### Workshop 5: Validation
- Validate ข้อมูลก่อน insert ลง Database
- ตรวจสอบ required fields
- จัดการ error response ที่เหมาะสม

---

## Phase 3 — Authentication

### Workshop 6: Password Hashing
- Hash รหัสผ่านด้วย `bcrypt`
- ระบบ Register / Login เบื้องต้น
- เปรียบเทียบ password ด้วย `bcrypt.compare`

### Workshop 7: JWT
- ออก JWT Token หลัง Login สำเร็จ
- ป้องกัน Route ด้วย Middleware ตรวจสอบ Token
- กำหนดอายุ Token (`expiresIn`)

---

## เทคโนโลยีที่ใช้

| เทคโนโลยี | รายละเอียด |
|---|---|
| Node.js | Runtime |
| Express.js | Web Framework |
| MySQL | Database |
| Docker Compose | รัน Database |
| bcrypt | Password Hashing |
| jsonwebtoken | JWT Authentication |

---

## วิธีรันแต่ละ Workshop

```bash
# เข้าไปใน workshop ที่ต้องการ
cd "phase1 - startUp ExpressJS/workshop-1-startup"

# ติดตั้ง dependencies
npm install

# รัน server
node server.js
```

สำหรับ Workshop ที่ใช้ Database (workshop-4 เป็นต้นไป) ต้องรัน Docker ก่อน:

```bash
docker compose up -d
```
