import React, { Component } from 'react';
import avatar from '../images/user.svg';

class PeopleListItem extends Component {
    state = {
        person: this.props.person,
    }
    selectPerson = (event) => {
        event.preventDefault();
        this.props.selectRecipient(this.state.person);
    }

    render() {
        let className = "fa fa-circle offline";
        let selectedClassName = "clearfix";
        let status = "offline";
        let badge = null;
        if (this.state.person.online) {
            className = "fa fa-circle online";
            status = "online";
        }
        if (this.props.selected) {
            selectedClassName = "clearfix selected-person";
        }
        if (localStorage.getItem('unreadMessages')) {
            const unreadMsgs = JSON.parse(localStorage.getItem('unreadMessages'));
            if (this.props.person.id in unreadMsgs) {
                const msgIds = Object.keys(unreadMsgs[this.props.person.id]);
                if (msgIds.length > 0) {
                    badge = <span className="badge1" data-badge={msgIds.length} />
                }
            }
        }
        return (
            <div>
                <li className={selectedClassName} onClick={this.selectPerson}>
                    <img src={avatar} alt="avatar" />
                    <div className="about">
                        <div className="name">{this.state.person.firstName + " " + this.state.person.lastName}</div>
                        <div className="status">
                            <i className={className}></i>
                            {status}
                        </div>
                    </div>
                </li>
                {badge}
            </div>
        );
    }
}

export default PeopleListItem;