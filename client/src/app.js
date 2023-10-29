const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');

const configViewEngine = require('./config/viewEngine');
const routes = require('./routes/index.route');
const allRoutes = require('./routes/all.route');
const errorHandle = require('./untils/errorHandle');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(morgan());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.COOKIE_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true },
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors());

configViewEngine(app);
routes(app);
app.use(errorHandle);
allRoutes(app);

app.listen(port, () => console.log(`server listen on port: ${port}`));
