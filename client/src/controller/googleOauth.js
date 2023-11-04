const googleStrategy = require('passport-google-oauth20').Strategy;
const { token } = require('../config/token');
const passport = require('../config/passport');
require('dotenv').config();

const passportGoogle = passport.use(
    new googleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['profile', 'email'],
        },
        (accessToken, refreshToken, profile, done) => {
            const user = {
                username: profile._json.name,
                email: profile._json.email,
                avatar: profile._json.picture,
                provider: profile.provider,
            };
            accessToken = token.accessToken(user);
            refreshToken = token.refreshToken(user);

            user.accessToken = accessToken;
            user.refreshToken = refreshToken;

            done(null, user);
        }
    )
);

module.exports = passportGoogle;
