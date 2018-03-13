import React, { Component } from 'react';

class Navbar extends Component {
    state = {
        firstName: this.props.firstName,
        dropMenuShowing: true
    }
    signOut = (event) => {
        event.preventDefault();
        localStorage.removeItem('logged');
        localStorage.removeItem('token');
        localStorage.removeItem('recipient');
        this.props.signOut(event);
    }

    toggleDropMenu = (event) => {
        event.preventDefault();
        this.setState({
            dropMenuShowing: !this.state.dropMenuShowing
        });
        console.log('Toggle Called, menu showing is ' + this.state.dropMenuShowing);
    }

    render() {
        let className = 'navbar-collapse';
        if (this.state.dropMenuShowing) {
            className = 'navbar-collapse collapse';
        }
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button
                            type="button"
                            className="navbar-toggle collapsed"
                            data-toggle="collapse"
                            data-target="#navbar"
                            aria-expanded="false"
                            aria-controls="navbar"
                            onClick={this.toggleDropMenu}
                        >
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="">Chatr</a>
                    </div>
                    <div id="navbar" className={className}>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a>{"Hi " + localStorage.getItem('firstName')}</a></li>
                            <li><a href="" onClick={event => this.signOut(event)}>Sign out</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;