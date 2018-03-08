'use strict';

const Router = require('koa-router');
const router = new Router();
const BASE_URL = `/api/v1/:userId/messages`;
const AuthTokenHelper = require("../../helpers/auth_token_helper");
const GeneralHelper = require("../../helpers/general_helper");
const models = require('../models/index');

router.post(BASE_URL, async (ctx) => {
    const verificationResult = await AuthTokenHelper.verifyToken(ctx);
    // console.log(verificationResult);
    if (isNaN(verificationResult)) {
        ctx.status = 401;
        ctx.body = {
            status: 'error',
            message: verificationResult
        };
    } else if (GeneralHelper.validateParams(ctx.request, ["body"])) {
        const message = await models.Message.create({
            sender: verificationResult,
            recipient: ctx.params.userId,
            body: ctx.request.body.body
        });
        if (message) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: message
            };
        } else {
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                message: 'Something went wrong.'
            };
        }
    } else {
        ctx.status = 422;
        ctx.body = {
            status: 'error',
            message: 'Parameter(s) missing.'
        };
    }
})



module.exports = router;