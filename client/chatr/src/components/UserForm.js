import React, { Component } from 'react';
import '../UserForm.css';
import '../UserFormFunctions.js';
import GeneralHelper from '../helpers/GeneralHelper';

class UserForm extends Component {
    state = {
        logged: this.props.logged,
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
    }

    handleFirstName(firstName) {
        this.setState({ firstName: firstName });
    }

    handleLastName(lastName) {
        this.setState({ lastName: lastName });
    }

    handleUsername(username) {
        this.setState({ username: username });
    }

    handlePassword(password) {
        this.setState({ password: password });
    }

    handleConfirmPassword(confirmPassword) {
        this.setState({ confirmPassword: confirmPassword });
    }

    signIn = (response) => {
        this.props.signIn(response);
    }

    handleSignInSubmit = (event) => {
        event.preventDefault();
        if (this.state.username && this.state.password) {
            let jsonData = {
                "username": this.state.username,
                "password": this.state.password
            };

            const signIn = async () => {
                const response = await fetch(GeneralHelper.apiBaseUrl + '/api/v1/auth/signin', {
                    method: "POST",
                    body: JSON.stringify(jsonData),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });
                const body = await response.json();

                if (response.status !== 200) throw Error(body.error.message);

                return body;
            };

            signIn()
                .then(res => this.signIn(res))
                .catch(err => console.log(err));
        } else {
            //Passwords don't match
        }
    }

    handleSignUpSubmit = (event) => {

        event.preventDefault();

        if (this.state.password === this.state.confirmPassword) {
            let jsonData = {
                "firstName": this.state.firstName,
                "lastName": this.state.lastName,
                "username": this.state.username,
                "password": this.state.password
            };

            const signUp = async () => {
                const response = await fetch(GeneralHelper.apiBaseUrl + '/api/v1/auth/signup', {
                    method: "POST",
                    body: JSON.stringify(jsonData),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });
                const body = await response.json();

                if (response.status !== 201) throw Error(body.error.message);

                return body;
            };

            signUp()
                .then(res => this.signIn(res))
                .catch(err => console.log(err));
        } else {
            //Passwords don't match
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <section id="formHolder">

                        <div className="row">

                            <div className="col-sm-6 brand">
                                <a href="" className="logo">CHATR <span>.</span></a>

                                <div className="heading">
                                    <h2>Chatr</h2>
                                    <p>AnyTime AnyWhere</p>
                                </div>
                            </div>

                            <div className="col-sm-6 form">

                                <div className="login form-peice switched">
                                    <form onSubmit={this.handleSignInSubmit} className="login-form" id="loginForm">
                                        <div className="form-group">
                                            <label htmlFor="username">Username</label>
                                            <input
                                                type="text"
                                                name="username"
                                                required
                                                value={this.state.username}
                                                onChange={event => this.handleUsername(event.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="loginPassword">Password</label>
                                            <input
                                                type="password"
                                                name="loginPassword"
                                                id="loginPassword"
                                                required
                                                value={this.state.password}
                                                onChange={event => this.handlePassword(event.target.value)}
                                            />
                                        </div>

                                        <div className="CTA">
                                            <input type="submit" value="Login" />
                                            <a href="" className="switch">I'm New</a>
                                        </div>
                                    </form>
                                </div>

                                <div className="signup form-peice">
                                    <form onSubmit={this.handleSignUpSubmit} className="signup-form" id="signupForm">

                                        <div className="form-group">
                                            <label htmlFor="firstName">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                                className="name"
                                                value={this.state.firstName}
                                                onChange={event => this.handleFirstName(event.target.value)}
                                            />
                                            <span className="error"></span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                                className="name"
                                                value={this.state.lastName}
                                                onChange={event => this.handleLastName(event.target.value)}
                                            />
                                            <span className="error"></span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="username">Username</label>
                                            <input
                                                type="text"
                                                name="username"
                                                id="username"
                                                required
                                                value={this.state.username}
                                                onChange={event => this.handleUsername(event.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                className="pass"
                                                value={this.state.password}
                                                onChange={event => this.handlePassword(event.target.value)}
                                            />
                                            <span className="error"></span>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="passwordCon">Confirm Password</label>
                                            <input
                                                type="password"
                                                name="passwordCon"
                                                id="passwordCon"
                                                className="passConfirm"
                                                value={this.state.confirmPassword}
                                                onChange={event => this.handleConfirmPassword(event.target.value)}
                                            />
                                            <span className="error"></span>
                                        </div>

                                        <div className="CTA">
                                            <input type="submit" value="Signup Now" id="submit" />
                                            <a href="" className="switch">I have an account</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </section>

                </div>
            </div>
        );
    }
}

export default UserForm;