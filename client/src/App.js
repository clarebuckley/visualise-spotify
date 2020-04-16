import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';

import './App.css';
import Login from './components/Login';
import TopTracks from './components/top-tracks-components/TopTracks';
import NowPlaying from './components/NowPlaying';
import TopArtists from './components/TopArtists';
import Welcome from './components/Welcome';
import getHashParams from "./hash.js";

const spotifyWebApi = new Spotify();

class App extends Component {
    constructor() {
        super();
        const params = getHashParams();
        this.state = {
            loggedIn: params.access_token ? true : false,
        }
        if (params.access_token) {
            spotifyWebApi.setAccessToken(params.access_token);
        }
    }


    render() {
        if (!this.state.loggedIn) {
            return (
                <div className="App">
                    <Login spotifyWebApi={spotifyWebApi} />
                </div>
            )
        } else {
            return (
                <div className="App" >
                    <h1> Visualise spotify </h1>
                    <Tabs defaultActiveKey="home" id="main-app-tabs">
                        <Tab eventKey="home" title="Welcome!">
                            <Welcome spotifyWebApi={spotifyWebApi}></Welcome>
                        </Tab>
                        <Tab eventKey="nowPlaying" title="Now Playing">
                            <NowPlaying spotifyWebApi={spotifyWebApi} />
                        </Tab>
                        <Tab eventKey="topArtists" title="Top Artists">
                            <TopArtists spotifyWebApi={spotifyWebApi} />
                        </Tab>
                        <Tab eventKey="topTracks" title="Top Tracks">
                            <TopTracks spotifyWebApi={spotifyWebApi} />
                        </Tab>
                    </Tabs>
                    
                    <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                </div >
            )
        }
    }
}

export default App;
