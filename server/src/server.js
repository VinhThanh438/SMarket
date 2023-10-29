const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const errorHandle = require('./middleware/errorHandle');
const flash = require('flash');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');
const ggRoutes = require('./routes/gg.auth.route');
const fbRoutes = require('./routes/fb.auth.route');
const allRoutes = require('./routes/all.route');
const roomRoutes = require('./routes/room.route');
const messageRoutes = require('./routes/message.route');
require('express-async-errors');
require('dotenv').config();
const { Server } = require("socket.io");
const { socketHandler } = require("../../server/src/socket");
const http = require("http");

const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT;

app.use(morgan());
app.use(
    cors({
        origin: `${process.env.CLIENT_DOMAIN}`,
        credentials: true,
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
app.use(flash());

userRoutes(app);
productRoutes(app);
ggRoutes(app);
fbRoutes(app);
roomRoutes(app);
messageRoutes(app);
allRoutes(app);
app.use(errorHandle);

app.listen(port, () => {
    console.log('server is running on port ', port);
});

// socket io
const io = new Server(httpServer, {
    pingTimeout: 60000,
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });
  socketHandler(io);
