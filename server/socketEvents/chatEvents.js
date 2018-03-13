'use strict';

const models = require('../models/index');

module.exports = socketio => {
    let onlineUsersCount = 0;
    let onlineUsers = {};

    socketio.on('connection', client => {
        let userAdded = false;

        client.on('add user', (user) => {
            if (userAdded) {
                return;
            }
            client.username = user.username;
            onlineUsers[client.username] = Object.assign({}, { socket: client.id }, user);
            onlineUsersCount++;

            try {
                models.User.find({ where: { username: user.username } })
                    .then((userInDB) => {
                        if (userInDB) {
                            userInDB.updateAttributes({
                                online: true
                            })
                        }
                    });
                socketio.emit('online users changed', user.firstName + ' is now online');
            } catch (err) {
                console.log(err);
            }
        });

        client.on('add message', async (message) => {
            try {
                const newMessage = await models.Message.create(message);
                if (newMessage) {
                    const recipientUser = await models.User.find({
                        where: {
                            id: newMessage.recipient
                        }
                    });
                    if (recipientUser.username in onlineUsers) {
                        socketio.to(onlineUsers[recipientUser.username].socket).emit('received', newMessage);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        });

        client.on('read message', async (messageId) => {
            try {
                models.Message.find({ where: { id: messageId } })
                    .then((message) => {
                        if (message) {
                            message.updateAttributes({
                                read: true
                            })
                            socketio.emit('message read', 'message #' + message.id + ' read');
                        }
                    });
            } catch (err) {
                console.log(err);
            }
        })

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
                try {
                    models.User.find({ where: { username: username } })
                        .then((user) => {
                            if (user) {
                                user.updateAttributes({
                                    online: false
                                })
                                socketio.emit('online users changed', user.firstName + ' is now offline');
                            }
                        });
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }

}