import React, { Component } from 'react';
import Navbar from './components/Navbar';
import UserForm from './components/UserForm';
import PeopleList from './components/PeopleList';
import ConversationList from './components/ConversationList';
import GeneralHelper from './helpers/GeneralHelper';
import { addUser, signOut, fetchReceivedMessage } from './socketEvents/ChatEvents';
import './App.css';
import './UserForm.css';
import './UserFormFunctions.js';

class App extends Component {
  state = {
    logged: localStorage.getItem('logged') ? true : false,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : 0,
    recipient: {},
    messages: [],
    update: false
  }

  componentDidMount() {
    // localStorage.removeItem('unreadMessages');
    if (localStorage.getItem('logged')) {
      addUser(
        localStorage.getItem('username'),
        localStorage.getItem('firstName'),
        localStorage.getItem('lastName'),
        localStorage.getItem('userId'),
        true
      );
      fetchReceivedMessage(message => {
        const newUnreadMsg = {};
        newUnreadMsg[message.id] = message.body;
        if (!localStorage.getItem('unreadMessages')) {
          const newUnreadMsgCollection = {};
          newUnreadMsgCollection[message.sender] = newUnreadMsg;
          localStorage.setItem('unreadMessages', JSON.stringify(newUnreadMsgCollection));
        } else {
          const unreadMsgs = JSON.parse(localStorage.getItem('unreadMessages'));
          if (message.sender in unreadMsgs) {
            if (!message.id in unreadMsgs[message.sender]) {
              unreadMsgs[message.sender][message.id] = message.body;
            }
          } else {
            unreadMsgs[message.sender] = newUnreadMsg;
          }
          localStorage.setItem('unreadMessages', JSON.stringify(unreadMsgs));
        }
        if (this.state.recipient) {
          this.selectConversation(this.state.recipient)
        }
        this.setState({
          update: !this.state.update
        });
        console.log(localStorage.getItem('unreadMessages'));
      });
    }
  }

  signIn = (response) => {
    if (response) {
      localStorage.setItem('logged', response.status === 'success');
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.userId);
      localStorage.setItem('username', response.username);
      localStorage.setItem('firstName', response.firstName);
      localStorage.setItem('lastName', response.lastName);
      this.setState({
        logged: localStorage.getItem('logged') ? true : false,
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
        userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : 0,
        firstName: localStorage.getItem('firstName') ? localStorage.getItem('firstName') : '',
        lastName: localStorage.getItem('lastName') ? localStorage.getItem('lastName') : '',
      });
      addUser(
        localStorage.getItem('username'),
        localStorage.getItem('firstName'),
        localStorage.getItem('lastName'),
        localStorage.getItem('userId'),
        true
      );
    }
  }

  signOut = (event) => {
    event.preventDefault();
    this.setState({
      logged: false,
      token: '',
      userId: 0,
      firstName: '',
      lastName: ''
    });
    signOut();
    window.location.reload(true);
  }

  getMessages = async (userId) => {
    const response = await fetch(GeneralHelper.apiBaseUrl + '/api/v1/' + userId + '/messages', {
      method: "GET",
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      })
    });
    const body = await response.json();

    if (response.status !== 200) throw Error(body.error.message);

    return body;
  }

  loadMessages = (recipient, response) => {
    this.setState({
      recipient: recipient,
      messages: response.data
    });
  }

  selectConversation = (recipient) => {
    this.getMessages(recipient.id)
      .then(res => this.loadMessages(recipient, res))
      .catch(err => console.log(err));
    this.forceUpdate();
  }

  render() {
    let mainView, conversation = null;
    if (this.state.recipient) {
      conversation =
        <ConversationList
          userId={this.state.userId}
          recipient={this.state.recipient}
          messages={this.state.messages}
          selectConversation={recipient => this.selectConversation(recipient)}
        />;
    } else {
      conversation =
        <div style={{ height: "auto" }}>
          <h3 style={{ textAlign: "center", top: "auto" }}>
            Select recipient in left pane to start chatting
          </h3>
        </div>;
    }
    if (this.state.logged) {
      mainView =
        <div>
          <Navbar
            signOut={event => this.signOut(event)}
          />
          <div className="chat-container clearfix">
            <PeopleList
              selectedRecipient={this.state.recipient.id}
              selectConversation={recipient => this.selectConversation(recipient)}
            />
            {conversation}
          </div>
        </div>;
    } else {
      mainView = <UserForm signIn={response => this.signIn(response)} />;
    }

    return (
      <div className="App">
        {mainView}
      </div >
    );
  }
}

export default App;
