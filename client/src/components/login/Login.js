import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
    render() {
        return (
            <div className="Login">
                <a className="loginLink" href="https://heroku-auth-server.herokuapp.com/login">
                    Login With Spotify
                </a>
            </div>
        );
    }
}

export default Login;
