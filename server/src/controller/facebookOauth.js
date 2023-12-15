<<<<<<< HEAD
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

const passportFacebook = passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_DOMAIN}/auth/facebook/callback`,
            profileFields: ['id', 'displayName', 'photos', 'email'],
        },
        async (accessToken, refreshToken, profile, cb) => {
            console.log(accessToken, refreshToken);
            console.log(profile);
            return cb(null, profile);
        }
    )
);

module.exports = passportFacebook;
=======
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

const passportFacebook = passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_DOMAIN}/auth/facebook/callback`,
            profileFields: ['id', 'displayName', 'photos', 'email'],
        },
        async (accessToken, refreshToken, profile, cb) => {
            console.log(accessToken, refreshToken);
            console.log(profile);
            return cb(null, profile);
        }
    )
);

module.exports = passportFacebook;
>>>>>>> 9f1e3e4dc13f497553b824a0a0f76c3d9ed1f7c3
