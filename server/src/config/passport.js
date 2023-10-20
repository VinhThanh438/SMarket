const passport = require('passport');
require('dotenv').config();

passport.serializeUser((user, done) => {
    process.nextTick(() => done(null, user));
});

passport.deserializeUser((user, done) => {
    process.nextTick(() => done(null, user));
});

module.exports = passport;
