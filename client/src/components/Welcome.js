import React, { Component } from 'react';
import './Welcome.css';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: [],
            dataLoaded: false
        }
    }

    componentDidMount() {
        this.getUserDetails();
    }

    getUserDetails = () => {
        this.props.spotifyWebApi.getMe()
            .then((response) => {
                console.log(response)
                this.setState({
                    userDetails: response,
                    dataLoaded: true
                })
            })
    }

    render() {
        if (!this.state.dataLoaded) {
            return null;
        }
        return (
            <div className="Welcome">
                <p> Hi  {this.state.userDetails.display_name.split(' ')[0]}! </p>
                <p> This web app will tell you all you need to know about your music taste. </p>
                <p> Click the tabs to see more :)</p>
                <p> Tell your {this.state.userDetails.followers.total} followers! </p>
            </div>
        );
    }
}

export default Welcome;
