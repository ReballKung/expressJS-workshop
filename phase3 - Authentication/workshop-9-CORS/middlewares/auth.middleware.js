const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "ไม่พบ Token หรือรูปแบบ Token ไม่ถูกต้อง" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'MY_SUPER_SECRET_KEY');
        
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(403).json({ message: "Token ไม่ถูกต้อง หรือหมดอายุแล้ว" });
    }
}

module.exports = verifyToken;