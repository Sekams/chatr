import React, { Component } from 'react';
import GeneralHelper from '../helpers/GeneralHelper';

class ConversationListItem extends Component {
    state = {
        type: this.props.type,
        time: this.props.time,
        recipient: this.props.recipient,
        online: this.props.online,
        body: this.props.body
    }

    render() {
        let mainView, className = null;
        let now = new Date();
        let then = new Date(this.state.time);
        let time = GeneralHelper.timeDifference(now.getTime(), then.getTime());
        if (this.state.online) {
            className = "fa fa-circle online"
        } else {
            className = "fa fa-circle offline"
        }
        if (this.state.type === "sent") {
            mainView =
                <li className="clearfix">
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
            <div>
                {mainView}
            </div>
        );
    }
}

export default ConversationListItem;
