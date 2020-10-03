import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            environment: null,
        };
    }

    componentDidMount() {
        this.setState({
            environment: this.getEnvironment(),
        });
    }

    getEnvironment = () => {
        var url = window.location.href;
        if (url.includes('localhost')) {
            return 'http://localhost:8888/login';
        } else {
            return 'https://heroku-auth-server.herokuapp.com/login';
        }
    };
    render() {
        if (!this.state.environment) {
            return <p>Loading...</p>;
        }
        return (
            <div className="Login">
                <a className="loginLink" href={this.state.environment}>
                    Login With Spotify
                </a>
            </div>
        );
    }
}

export default Login;
