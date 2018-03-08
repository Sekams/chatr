'use strict';

const Router = require('koa-router');
const router = new Router();
const models = require('../models/index');
const BASE_URL = `/api/v1/auth`;
const AuthTokenHelper = require("../../helpers/auth_token_helper");
const GeneralHelper = require("../../helpers/general_helper");

router.post(`${BASE_URL}/signup`, async (ctx) => {
    if (GeneralHelper.validateParams(ctx.request, ["username", "password", "firstName", "lastName"])) {
        try {
            const existingUser = await models.User.find({
                where: {
                    username: ctx.request.body.username.toLowerCase()
                }
            });
            if (existingUser) {
                ctx.status = 409;
                ctx.body = {
                    status: 'error',
                    message: 'User already exists.'
                };
            } else {
                const hashedPassword = await models.User.generateHash(ctx.request.body.password);
                const user = await models.User.create({
                    username: ctx.request.body.username.toLowerCase(),
                    password: hashedPassword,
                    firstName: ctx.request.body.firstName,
                    lastName: ctx.request.body.lastName,
                });
                if (user) {
                    ctx.status = 201;
                    ctx.body = {
                        status: 'success',
                        token: AuthTokenHelper.generateToken(user.id)
                    };
                } else {
                    ctx.status = 400;
                    ctx.body = {
                        status: 'error',
                        message: 'Something went wrong.'
                    };
                }
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        ctx.status = 422;
        ctx.body = {
            status: 'error',
            message: 'Parameter(s) missing.'
        };
    }
})

router.post(`${BASE_URL}/signin`, async (ctx) => {
    if (GeneralHelper.validateParams(ctx.request, ["username", "password"])) {
        try {
            const user = await models.User.find({
                where: {
                    username: ctx.request.body.username.toLowerCase()
                }
            });
            if (user && await user.validPassword(ctx.request.body.password)) {
                ctx.status = 200;
                ctx.body = {
                    status: 'success',
                    token: AuthTokenHelper.generateToken(user.id)
                };
            } else {
                ctx.status = 401;
                ctx.body = {
                    status: 'error',
                    message: 'Invalid username or password.'
                };
            }
        } catch (err) {
            console.log(err);
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