// ============================================================
// Controller: Profile
// Controller คือส่วนที่รับ Request และส่ง Response
// แยกออกมาจาก Route เพื่อให้โค้ดอ่านง่ายและนำ Logic ไปใช้ซ้ำได้
// ============================================================

// ฟังก์ชัน getProfile รับ (req, res) เหมือน Route Handler ปกติ
// แต่แยกไฟล์ออกมาให้ Route เรียกใช้อีกที
const getProfile = (req, res) => {
    const name = 'Sukrit Saeliao';
    const role = 'FullStack'
    const skills = ["JavaScript", "TypeScript", "Vue", "Nuxt", "React", "PHP", "C", "C#", "Blazor", "HTML", "CSS", "TailwindCSS", "Bootstrap"];

    res.json({
        name,
        role,
        skills
    });
};

// module.exports ทำให้ไฟล์อื่น import ฟังก์ชันนี้ไปใช้ได้
// ใช้รูปแบบ object เพื่อรองรับการ export หลายฟังก์ชันในอนาคต
module.exports = { getProfile }
