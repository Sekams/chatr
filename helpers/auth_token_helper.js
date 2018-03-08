'use strict'

var jwt = require('jsonwebtoken');
var models = require('../server/models/index');

const SECRET = process.env.SECRET || "thissecretissosecretyoudontevenknowit";

const generateToken = function (userId) {
    return jwt.sign({ id: userId }, SECRET, {
        expiresIn: 86400 // expires in 24 hours
    });
}

const verifyToken = async (ctx) => {
    const token = ctx.request.headers['x-access-token'];
    if (token) {
        let payload;
        jwt.verify(token, SECRET, function (err, decoded) {
            if (err) {
                return 'Something went wrong.';
            }
            payload = decoded.id;
        });
        return await findUser(payload);
    } else {
        return 'No auth token provided.';
    }
}

const findUser = async (id) => {
    const user = await models.User.find({
        where: {
            id: id
        }
    });
    if (!user) {
        return 'Invalid token payload.';
    } else {
        return user.id;
    }
}

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;