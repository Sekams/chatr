import React, { Component } from 'react';
import PeopleListItem from './PeopleListItem';
import GeneralHelper from '../helpers/GeneralHelper';

class PeopleList extends Component {
    state = {
        people: [],
    }

    componentDidMount() {
        this.serverGetPeople()
            .then(res => this.getPeople(res))
            .catch(err => console.log(err));
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

    getPeople = (response) => {
        if (response.status === 'success') {
            this.setState({
                people: response.data
            });
        } else {
            console.log(response);
        }
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
            people = <h3>No people to show</h3>;
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