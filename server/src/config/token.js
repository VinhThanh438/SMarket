const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.token = {
    accessToken: (data) =>
        jwt.sign(
            {
                user_id: data.user_id,
                user_name: data.user_name,
                user_role: data.user_role,
                phone_number: data.phone_number,
                avatar: data.avatar,
                provider: data.provider,
                create_at: data.create_at,
                address: data.address,
            },
            process.env.JWT_ACCESS_KEY,
            {
                expiresIn: '60s',
            }
        ),
    refreshToken: (data) =>
        jwt.sign(
            {
                user_id: data.user_id,
                user_name: data.user_name,
                user_role: data.user_role,
                phone_number: data.phone_number,
                avatar: data.avatar,
                provider: data.provider,
                create_at: data.create_at,
                address: data.address,
            },
            process.env.JWT_REFRESH_KEY,
            {
                expiresIn: '365d',
            }
        ),
};

module.exports.cookieOption = {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    // secure: true,
};

module.exports.isTokenExpried = (token) => {
    const decodeToken = jwt.decode(token);
    const expirationTime = decodeToken.exp * 1000;
    const currentTime = Date.now().valueOf() / 1000;
    return expirationTime > currentTime;
};
