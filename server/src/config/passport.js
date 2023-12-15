<<<<<<< HEAD
const passport = require('passport');
require('dotenv').config();

passport.serializeUser((user, done) => {
    process.nextTick(() => done(null, user));
});

passport.deserializeUser((user, done) => {
    process.nextTick(() => done(null, user));
});

module.exports = passport;
=======
const passport = require('passport');
require('dotenv').config();

passport.serializeUser((user, done) => {
    process.nextTick(() => done(null, user));
});

passport.deserializeUser((user, done) => {
    process.nextTick(() => done(null, user));
});

module.exports = passport;
>>>>>>> 9f1e3e4dc13f497553b824a0a0f76c3d9ed1f7c3
