'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');

const app = new Koa();
const PORT = process.env.PORT || 1337;

app.use(bodyParser());

app.use(indexRoutes.routes());
app.use(authRoutes.routes());
app.use(messagesRoutes.routes());

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;