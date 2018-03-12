import React, { Component } from 'react';
import ConversationListItem from './CoversationListItem';
import avatar from '../images/user.svg';
import GeneralHelper from '../helpers/GeneralHelper';
import { addUser, fetchOlineUsers, fetchReceivedMessage, fetchSentMessage, sendMessage } from '../socketEvents/ChatEvents';

class ConversationList extends Component {
    state = {
        userId: this.props.userId,
        recipient: this.props.recipient,
        messages: this.props.messages,
        message: ''
    }

    componentDidMount

    handleMessage(message) {
        this.setState({ message: message });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.message) {
            let jsonData = {
                "body": this.state.message
            };

            const signIn = async () => {
                const response = await fetch(GeneralHelper.apiBaseUrl + '/api/v1/' + this.props.recipient.id + '/messages', {
                    method: "POST",
                    body: JSON.stringify(jsonData),
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.getItem('token')
                    })
                });
                const body = await response.json();

                if (response.status !== 201) throw Error(body.message);

                return body;
            };

            signIn()
                .then(res => {
                    this.props.selectConversation(this.props.recipient)
                    this.handleMessage('');
                })
                .catch(err => console.log(err));
        } else {
            //Passwords don't match
        }
    }

    render() {
        let messages = null;
        let mainView =
            <div style={{ height: "785px" }}>
                <h3 style={{ height: "785px", paddingRight: "10%", paddingLeft: "10%", textAlign: "center", paddingTop: "50%" }}>
                    Select recipient in left pane to start chatting
                </h3>
            </div>;
        if (this.props.messages.length > 0) {
            messages = this.props.messages.map((message) => {
                return (
                    <ConversationListItem
                        key={message.id}
                        type={"" + message.sender === "" + this.props.userId ? "sent" : "received"}
                        time={message.createdAt}
                        recipient={this.props.recipient}
                        online={this.props.recipient.online}
                        body={message.body}
                    />
                );
            });

        } else {
            messages = <h3 style={{ textAlign: "center", marginLeft: "-46px" }}>No messages yet</h3>;
        } if (this.props.recipient.id) {
            mainView =
                <div>
                    <div className="chat-header clearfix">
                        <img src={avatar} alt="avatar" />

                        <div className="chat-about">
                            <div className="chat-with">{this.props.recipient.firstName + " " + this.props.recipient.lastName}</div>
                            <div className="chat-num-messages">{this.props.recipient.online ? "online" : "offline"}</div>
                        </div>
                        <i className="fa fa-star"></i>
                    </div>

                    <div className="chat-history">
                        <ul style={{ listStyleType: 'none' }}>
                            {messages}
                        </ul>
                    </div>
                    <div className="form chat-message clearfix">
                        <div className="signup message-form-piece">
                            <form id="messageForm" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <textarea
                                        type="text"
                                        name="message"
                                        placeholder="Type Message Here"
                                        rows="2" id="message"
                                        required
                                        value={this.state.message}
                                        onChange={event => this.handleMessage(event.target.value)}
                                    />
                                </div>
                                <button type="submit">Send</button>
                            </form>
                        </div>
                    </div>
                </div>;
        }
        return (
            <div>
                <div className="chat">
                    {mainView}
                </div>
            </div>
        );
    }
}

export default ConversationList;