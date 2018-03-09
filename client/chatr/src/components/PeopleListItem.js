import React, { Component } from 'react';

class PeopleListItem extends Component {
    state = {
        name: this.props.name,
        online: this.props.online,
        updatedAt: this.props.updatedAt
    }
    render() {
        let className = "fa fa-circle offline";
        let status = "offline";
        if (this.state.online) {
            className = "fa fa-circle online";
            status = "online";
        }
        return (
            <li className="clearfix">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                <div className="about">
                    <div className="name">{this.state.name}</div>
                    <div className="status">
                        <i className={className}></i>
                        {status}
                    </div>
                </div>
            </li>
        );
    }
}

export default PeopleListItem;