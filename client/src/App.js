import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';

import './App.css';
import Login from './components/login/Login';
import ErrorPage from './ErrorPage';
import TopTracks from './components/top-tracks/TopTracks';
import NowPlaying from './components/now-playing/NowPlaying';
import TopArtists from './components/top-artists/TopArtists';
import Welcome from './components/welcome/Welcome';
import FrequentlyAskedQuestions from './components/faq/FrequentlyAskedQuestions';
import getHashParams from "./hash.js";

const spotifyWebApi = new Spotify();

class App extends Component {
    constructor() {
        super();
        const params = getHashParams();
        this.state = {
            loggedIn: params.access_token ? true : false,
            dataLoaded: false
        }
        if (params.access_token) {
            spotifyWebApi.setAccessToken(params.access_token);
        }
    }


    //NOTE: this will need to be changed when the authorization work is sorted
    // --> there is a /logout endpoint on the server side which will redirect to the spotify log out page,
    // but we still need to be able to redirect back to our login page when that request has been made
    logOut = () => {
        var url = window.location.href;
        if (url.includes("localhost")) {
            window.location.replace("http://localhost:3000/")
        } else {
            window.location.replace("https://visualise-spotify.herokuapp.com/")
        }
    }

    handleTabClick = (eventKey) => {
        if (eventKey === "logOut") {
            this.logOut();
        }
    }

    componentDidMount() {
        spotifyWebApi.getMe()
            .then((response) => {
                this.setState({
                    userDetails: response,
                    dataLoaded: true
                })
                console.log(response);
            })
    }


    render() {
        if (!this.state.loggedIn) {
            return (
                <div className="App">
                    <Login spotifyWebApi={spotifyWebApi} />
                </div>
            )
        }
        else if (!this.state.dataLoaded) {
            return (
                <ErrorPage logOut={this.logOut} />
                )
        }
        else{
            return (
                <div className="App col">
                    <Tabs defaultActiveKey="home" id="main-app-tabs" className="tabs" onSelect={(k) => this.handleTabClick(k)}>
                        <Tab eventKey="home" title="Welcome!">
                            <Welcome userDetails={this.state.userDetails}/>
                        </Tab>
                        <Tab eventKey="topArtists" title="Top Artists">
                            <TopArtists userId={this.state.userDetails.id} logOut={this.logOut} spotifyWebApi={spotifyWebApi} />
                        </Tab>
                        <Tab eventKey="topTracks" title="Top Tracks">
                            <TopTracks userId={this.state.userDetails.id} spotifyWebApi={spotifyWebApi} />
                        </Tab>
                        <Tab eventKey="faq" title="FAQ">
                            <FrequentlyAskedQuestions/>
                        </Tab>
                        <Tab className="logOut" eventKey="logOut" title="Log out" onClick={this.logOut}>
                        </Tab>
                    </Tabs>
                    <div className="footer">
                        <NowPlaying spotifyWebApi={spotifyWebApi} />
                        <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                    </div>
                </div >
            )
        }
    }
}

export default App;
