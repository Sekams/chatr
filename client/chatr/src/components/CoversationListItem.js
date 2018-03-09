import React, { Component } from 'react';

class ConversationListItem extends Component {
    state = {
        type: this.props.type,
        time: this.props.time,
        recipient: this.props.recipient,
        online: this.props.online,
        body: this.props.body
    }

    render() {
        let view, className = null;
        if (this.state.online) {
            className = "fa fa-circle online"
        } else {
            className = "fa fa-circle offline"
        }
        if (this.state.type === "sent") {
            view =
                <li className="clearfix">
                    <div className="message-data align-right">
                        <span className="message-data-time" >{this.state.time}</span> &nbsp; &nbsp;
                        <span className="message-data-name" >Me</span>
                        <i className="fa fa-circle me"></i>
                    </div>

                    <div className="message other-message float-right">
                        {this.state.body}
                    </div>
                </li>;
        } else {
            view =
                <li>
                    <div className="message-data">
                        <span className="message-data-name"><i className={className}></i> {this.state.recipient.firstName}</span>
                        <span className="message-data-time">{this.state.time}</span>
                    </div>
                    <div className="message my-message">
                        {this.state.body}
                    </div>
                </li>
        }
        return (
            { view }
        );
    }
}

export default ConversationListItem;
