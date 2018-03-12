'use strict';

const models = require('../models/index');

module.exports = socketio => {
    let onlineUsersCount = 0;
    let onlineUsers = {};

    socketio.on('connection', client => {
        let userAdded = false;

        client.on('add user', user => {
            if (userAdded) {
                return;
            }
            client.username = user.username;
            onlineUsers[client.username] = Object.assign({}, { socket: client.id }, user);
            onlineUsersCount++;

            socketio.emit('online users', onlineUsers);
        });

        client.on('add message', async ({ sender, recipient, socket, body }) => {
            try {
                const message = await models.Message.create({
                    sender: sender,
                    recipient: recipient,
                    body: body
                });
                socketio.to(socket).emit('received', message);
                socketio.to(client.id).emit('sent', message);
            } catch (err) {
                console.log(err);
            }
        });

        client.on('signout', () => {
            userOffline(client.id);
        });

        client.on('disconnect', () => {
            userOffline(client.id);
        })

    });

    const userOffline = (socket) => {
        const onlineUserUsernames = Object.keys(onlineUsers);
        for (let username of onlineUserUsernames) {
            if (onlineUsers[username].socket === socket) {
                delete onlineUsers[username];
                onlineUsersCount--;
                socketio.emit('online users', onlineUsers);
            }
        }
    }

}