import React, { Component } from 'react';
import Navbar from './components/Navbar';
import UserForm from './components/UserForm';
import PeopleList from './components/PeopleList';
import ConversationList from './components/ConversationList';
import './App.css';
import './UserForm.css';

class App extends Component {
  state = {
    logged: false,
    token: '',
    userId: 0,
    recipient: {},
    messages: []
  }

  signIn = (response) => {
    if (response) {
      this.setState({
        logged: response.body.status === 'success',
        token: response.body.token,
        userId: response.body.userId,
        firstName: response.body.firstName,
        lastName: response.body.lastName
      });
    }
  }

  render() {
    let mainView = null;
    if (this.state.logged) {
      mainView =
        <div>
          <Navbar />
          <div className="chat-container clearfix">
            <PeopleList />
            <ConversationList
              userId={this.state.userId}
              recipient={this.state.recipient}
              messages={this.state.messages}
            />
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
