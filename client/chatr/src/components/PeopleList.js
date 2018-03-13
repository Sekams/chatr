import React, { Component } from 'react';
import PeopleListItem from './PeopleListItem';
import GeneralHelper from '../helpers/GeneralHelper';
import { fetchOnlineUsers } from '../socketEvents/ChatEvents';

class PeopleList extends Component {
    state = {
        people: [],
        notification: '',
        update: false
    }

    componentDidMount() {
        fetchOnlineUsers(notification => {
            this.setState({
                people: []
            })
            this.serverGetPeople()
                .then(res => {
                    if (res.status === 'success') {
                        this.getPeople(res.data, notification);
                    } else {
                        console.log(res);
                    }
                })
                .catch(err => console.log(err));
        });
    }

    serverGetPeople = async () => {
        const response = await fetch(GeneralHelper.apiBaseUrl + '/api/v1/users', {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            })
        });
        const body = await response.json();

        if (response.status !== 200) throw Error(body.error.message);

        return body;
    };

    getPeople = (response, notification) => {
        this.setState({
            people: response,
            notification: notification
        });
    }

    selectRecipient = (recipient) => {
        this.props.selectConversation(recipient);
    }

    render() {
        let people = null;
        if (this.state.people.length > 0) {
            people = this.state.people.map((person) => {
                return (
                    <PeopleListItem
                        key={person.id}
                        person={person}
                        selected={this.props.selectedRecipient && this.props.selectedRecipient === person.id}
                        selectRecipient={person => this.selectRecipient(person)}
                    />
                );
            });
        } else {
            people = <h3 style={{ padding: "30px" }}>No people to show</h3>;
        }
        return (
            <div className="people-list" id="people-list">
                <ul className="list">
                    {people}
                </ul>
            </div>
        );
    }
}

export default PeopleList;