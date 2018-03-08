'use strict';

const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = {
        status: 'success',
        message: 'Chatr is online!'
    };
})

module.exports = router;