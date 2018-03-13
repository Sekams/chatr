'use strict';

const Router = require('koa-router');
const router = new Router();
const BASE_URL = `/api/v1/:userId/messages`;
const AuthTokenHelper = require("../../helpers/auth_token_helper");
const GeneralHelper = require("../../helpers/general_helper");
const models = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get(BASE_URL, async (ctx) => {
    const verificationResult = await AuthTokenHelper.verifyToken(ctx);
    if (isNaN(verificationResult)) {
        ctx.status = 401;
        ctx.body = {
            status: 'error',
            message: verificationResult
        };
    } else {
        try {
            const messages = await models.Message.findAll({
                where: {
                    [Op.or]: [
                        {
                            sender: verificationResult,
                            recipient: ctx.params.userId
                        },
                        {
                            sender: ctx.params.userId,
                            recipient: verificationResult
                        }
                    ]
                },
                order: ['createdAt']
            });
            if (messages) {
                ctx.status = 200;
                ctx.body = {
                    status: 'success',
                    data: messages
                };
            } else {
                ctx.status = 400;
                ctx.body = {
                    status: 'error',
                    message: 'Something went wrong.'
                };
            }
        } catch (err) {
            console.log(err);
        }
    }
})

module.exports = router;