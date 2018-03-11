'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');
const usersRoutes = require('./routes/users');

const app = new Koa();
const PORT = process.env.PORT || 1337;

app.use(bodyParser());

app.use(cors());
app.use(indexRoutes.routes());
app.use(authRoutes.routes());
app.use(messagesRoutes.routes());
app.use(usersRoutes.routes());

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;