import React, { Component } from 'react';
import PeopleListItem from './PeopleListItem';

class PeopleList extends Component {
    state = {
        people: []
    }

    componentDidMount() {
        this.getPeople();
    }

    getPeople = () => {
        const newPeople = [
            {
                id: 2,
                username: "Sekams",
                firstName: "Simon Peter",
                lastName: "Ssekamatte",
                online: true
            },
            {
                id: 1,
                username: "Wandobs",
                firstName: "Brian Joram",
                lastName: "Wandobire",
                online: false
            }
        ]
        this.setState({
            people: newPeople
        });
    }

    render() {
        let people = null;
        if (this.state.people.length > 0) {
            people = this.state.people.map((person) => {
                return (
                    <PeopleListItem
                        name={person.firstName + " " + person.lastName}
                        online={person.online}
                        updatedAt="since 1 hour ago"
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