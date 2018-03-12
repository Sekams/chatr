import socketClient from 'socket.io-client';
import GeneralHelper from '../helpers/GeneralHelper';

const socketio = socketClient(GeneralHelper.apiBaseUrl);
const userId = Number(localStorage.getItem('userId'));

export const addUser = (username, firstName, LastName, userId) => socketio.emit('add user', { username, firstName, LastName, userId });

export const fetchOlineUsers = (callback) => { socketio.on('online users', onlineUsers => callback(onlineUsers)) };

export const sendMessage = (recipient, body, socket) => {
    socketio.emit('add message',
        { userId, recipient, socket, body }
    )
};

export const fetchReceivedMessage = (callback) => { socketio.on('received', message => callback(message)) };

export const fetchSentMessage = (callback) => { socketio.on('sent', message => callback(message)) };

export const signOut = () => { socketio.emit('signout') };
