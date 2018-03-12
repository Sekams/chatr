'use strict';

const Koa = require('koa');
const app = new Koa();
const http = require('http').createServer(app.callback());
const socketio = require('socket.io')(http);
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
require('./socketEvents/chatEvents')(socketio);

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');
const usersRoutes = require('./routes/users');

const PORT = process.env.PORT || 1337;

app.use(cors());
app.use(bodyParser());
app.use(indexRoutes.routes());
app.use(authRoutes.routes());
app.use(messagesRoutes.routes());
app.use(usersRoutes.routes());

const server = http.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;