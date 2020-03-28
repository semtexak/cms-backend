const jwt = require('../utils/jwt');

const authGuard = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (token) {
        const decodedUser = jwt.decodeAndValidateToken(token);
        if (decodedUser && !decodedUser.expired) {
            console.log('Token is VALID');
            req.locals = {
                authentication: decodedUser
            };
            return next();
        } else {
            console.log('Token is INVALID');
            res.status(401).send({ error: 401, message: 'Token has expired.' });
        }
    } else {
        res.status(401).send({ error: 401, message: 'Token not present in headers.' });
    }
};

const adminRoleGuard = (req, res, next) => {
    const decodedUser = req.locals.authentication;
    if (decodedUser && decodedUser.user.roles.includes('ADMIN')) {
        next();
    } else {
        res.status(403).send({ status: 403, message: 'Permission denied.' });
    }
};

module.exports = {
    authGuard,
    adminRoleGuard
};
