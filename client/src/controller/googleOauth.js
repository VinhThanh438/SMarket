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
                name: profile._json.name,
                email: profile._json.email,
                avatar: profile._json.picture,
            };

            accessToken = token.accessToken(user);
            refreshToken = token.refreshToken(user);

            profile.accessToken = accessToken;
            profile.refreshToken = refreshToken;

            done(null, profile);
        }
    )
);

module.exports = passportGoogle;
