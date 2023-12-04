const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        config.sessionSecret,
        { expiresIn: '1h' }
    );
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.sessionSecret);
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken
};
