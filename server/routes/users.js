'use strict';

const Router = require('koa-router');
const router = new Router();
const BASE_URL = `/api/v1/users`;
const AuthTokenHelper = require("../../helpers/auth_token_helper");
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
            const users = await models.User.findAll({
                where: {
                    id: {
                        [Op.ne]: verificationResult
                    }
                },
                order: [['online', 'DESC']]
            });
            if (users) {
                let optimumUsers = [];
                users.forEach(user => {
                    const optimumUser = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        online: user.online
                    }
                    optimumUsers.push(optimumUser);
                });
                ctx.status = 200;
                ctx.body = {
                    status: 'success',
                    data: optimumUsers
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

router.get(`${BASE_URL}/:userId`, async (ctx) => {
    const verificationResult = await AuthTokenHelper.verifyToken(ctx);
    if (isNaN(verificationResult)) {
        ctx.status = 401;
        ctx.body = {
            status: 'error',
            message: verificationResult
        };
    } else {
        try {
            const user = await models.User.find({
                where: {
                    id: ctx.params.userId
                }
            });
            if (user) {
                const optimumUser = {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    online: user.online
                }

                ctx.status = 200;
                ctx.body = {
                    status: 'success',
                    data: optimumUser
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