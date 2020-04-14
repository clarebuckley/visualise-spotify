import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Login">
                <a href="http://localhost:8888/login">
                    <button>Login With Spotify</button>
                </a>
            </div>
        );
    }
}

export default Login;
