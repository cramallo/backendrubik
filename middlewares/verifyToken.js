const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.get('auth-token');

    if (!token) return res.status(401).send('Access denied');

    try {
        const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verifiedToken.user;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}
