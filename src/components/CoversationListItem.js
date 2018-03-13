import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GeneralHelper from '../helpers/GeneralHelper';
import { readMessage } from '../socketEvents/ChatEvents';

class ConversationListItem extends Component {
    state = {
        type: this.props.type,
        time: this.props.time,
        recipient: this.props.recipient,
        online: this.props.online,
        body: this.props.body,
    }
    componentDidMount() {
        if (this.props.last) {
            ReactDOM.findDOMNode(this).scrollIntoView();
        }
    }

    render() {
        let VisibilitySensor = require('react-visibility-sensor');
        let mainView, className, dateLabel = null;
        const time = GeneralHelper.timeStamp(this.state.time);
        const date = GeneralHelper.dateStamp(this.state.time);

        const onChange = (isVisible) => {
            if (!this.props.read && isVisible) {
                if (localStorage.getItem("unreadMessages")) {
                    const unreadMsgs = JSON.parse(localStorage.getItem('unreadMessages'));
                    if (this.props.sender in unreadMsgs && this.props.id in unreadMsgs[this.props.sender]) {
                        delete unreadMsgs[this.props.sender][this.props.id];
                        localStorage.setItem("unreadMessages", JSON.stringify(unreadMsgs));
                        this.props.selectConversation(this.props.recipient);
                        readMessage(this.props.id);
                    }
                }
            }
        }

        if (localStorage.getItem("dateLabel") && localStorage.getItem("dateLabel") !== date) {
            localStorage.setItem("dateLabel", date);
            dateLabel = <div className="date-label"><span>{date}</span></div>;
        }

        if (this.state.online) {
            className = "fa fa-circle online"
        } else {
            className = "fa fa-circle offline"
        }
        if (this.state.type === "sent") {
            mainView =
                <li className="clearfix">
                    {dateLabel}
                    <div className="message-data align-right">
                        <span className="message-data-time" >{time}</span> &nbsp; &nbsp;
                        <span className="message-data-name" >Me </span>
                        <i className="fa fa-circle me"></i>
                    </div>

                    <div className="message other-message float-right">
                        {this.state.body}
                    </div>
                </li>;
        } else {
            mainView =
                <li>
                    {dateLabel}
                    <div className="message-data">
                        <span className="message-data-name"><i className={className}></i> {this.state.recipient.firstName}</span>
                        <span className="message-data-time">{time}</span>
                    </div>
                    <div className="message my-message">
                        {this.state.body}
                    </div>
                </li>
        }
        return (
            <VisibilitySensor onChange={onChange}>
                {mainView}
            </VisibilitySensor>
        );
    }
}

export default ConversationListItem;
