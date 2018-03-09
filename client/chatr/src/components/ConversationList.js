import React, { Component } from 'react';
import ConversationListItem from './CoversationListItem';

class ConversationList extends Component {
    state = {
        userId: this.props.userId,
        recipient: this.props.recipient,
        messages: this.props.messages
    }

    componentDidMount() {

    }

    render() {
        let messages = null;
        if (this.state.messages.length > 0) {
            messages = this.state.messages.map((message) => {
                return (
                    <ConversationListItem
                        type={message.sender === this.state.userId ? "sent" : "received"}
                        time={message.createdAt}
                        recipient={this.state.recipient}
                        online={this.state.recipient.online}
                        body={message.body}
                    />
                );
            });

        }
        return (
            <div>
                <div className="chat">
                    <div className="chat-header clearfix">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />

                        <div className="chat-about">
                            <div className="chat-with">{this.state.recipient.firstName + " " + this.state.recipient.lastName}</div>
                            <div className="chat-num-messages">{this.state.online ? "online" : "offline"}</div>
                        </div>
                        <i className="fa fa-star"></i>
                    </div>

                    <div className="chat-history">
                        <ul style={{ listStyleType: 'none' }}>
                            {messages}
                        </ul>
                    </div>
                </div>

                <div className="form chat-message clearfix">
                    <div className="message-form-piece">
                        <form>
                            <div className="form-group">
                                <label htmlFor="loginPassword">Message</label>
                                <input type="text" name="message" rows="3" id="message" required />
                            </div>
                            <button>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConversationList;