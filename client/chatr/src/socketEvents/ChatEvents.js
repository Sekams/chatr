import socketClient from 'socket.io-client';
import GeneralHelper from '../helpers/GeneralHelper';

const socketio = socketClient(GeneralHelper.apiBaseUrl);

export const addUser = (username, firstName, lastName, id, online) => { socketio.emit('add user', { username, firstName, lastName, id, online }) };

export const fetchOnlineUsers = (callback) => { socketio.on('online users changed', notification => callback(notification)) };

export const sendMessage = (sender, recipient, body) => { socketio.emit('add message', { sender, recipient, body }) };

export const readMessage = (messageId) => { socketio.emit('read message', messageId) };

export const messageRead = (callback) => { socketio.on('message read', notification => callback(notification)) };

export const fetchReceivedMessage = (callback) => { socketio.on('received', message => callback(message)) };

export const signOut = () => { socketio.emit('signout') };
