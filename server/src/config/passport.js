const passport = require('passport');
require('dotenv').config();

passport.serializeUser((user, done) => {
    process.nextTick(() =>
        done(null, {
            id: user.id,
            username: user.name,
            email: user._json.email,
        })
    );
});

passport.deserializeUser((user, done) => {
    process.nextTick(() => done(null, user));
});

module.exports = passport;
