import React, { Component } from 'react';
import Navbar from './components/Navbar';
import UserForm from './components/UserForm';
import PeopleList from './components/PeopleList';
import ConversationList from './components/ConversationList';
import GeneralHelper from './helpers/GeneralHelper';
import { addUser, signOut } from './socketEvents/ChatEvents';
import './App.css';
import './UserForm.css';
import './UserFormFunctions.js';

class App extends Component {
  state = {
    logged: localStorage.getItem('logged') ? true : false,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : 0,
    recipient: {},
    messages: []
  }

  signIn = (response) => {
    if (response) {
      localStorage.setItem('logged', response.status === 'success');
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.userId);
      localStorage.setItem('firstName', response.firstName);
      localStorage.setItem('lastName', response.lastName);
      this.setState({
        logged: localStorage.getItem('logged') ? true : false,
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
        userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : 0,
        firstName: localStorage.getItem('firstName') ? localStorage.getItem('firstName') : '',
        lastName: localStorage.getItem('lastName') ? localStorage.getItem('lastName') : '',
      });
      addUser(response.username, response.firstName, response.lastName, response.userId);
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
