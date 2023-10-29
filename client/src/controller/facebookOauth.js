const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

const passportFacebook = passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            profileFields: ['photos', 'profileUrl'],
        },
        async (accessToken, refreshToken, profile, cb) => {
            console.log(profile);
            console.log(
                'https://graph.facebook.com/' +
                    profile.id +
                    '/picture' +
                    '?width=200&height=200' +
                    '&access_token=' +
                    accessToken
            );
            return cb(null, profile);
        }
    )
);

module.exports = passportFacebook;
