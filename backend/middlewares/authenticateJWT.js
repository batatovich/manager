const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
            if (err) {
                return res.sendStatus(403); // Forbidden if token is invalid
            }
            req.user = {id: payload.id, email: payload.email}; ; // Attach user information to request object
            next(); // Proceed to the next middleware or route handler
        });
    } else {
        res.sendStatus(401); // Unauthorized if no token is provided
    }
};

module.exports = authenticateJWT;
