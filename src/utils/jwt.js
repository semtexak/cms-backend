const jwt = require('jsonwebtoken');
const tokenKey = 'djghhhhuuwiwuewieuwieuriwu';

const encodeToken = (user) => {
    return {
        token: jwt.sign({
            _id: user._id,
            email: user.email,
            img: user.img,
            name: user.name,
            roles: user.roles,
            iat: Math.floor(Date.now() / 1000) + (60 * 60)
        }, tokenKey)
    };
};

const decodeToken = (token) => {
    return jwt.verify(token, tokenKey);
};

const decodeAndValidateToken = (token) => {
    const decodedUser = decodeToken(token);
    return { user: decodedUser, expired: !isValid(decodedUser.iat * 1000) };
};

const isValid = (iat) => {
    const now = new Date().getTime();
    return (iat) >= now;
};



module.exports = {
    tokenKey,
    encodeToken,
    decodeToken,
    isValid,
    decodeAndValidateToken
};
