import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import Login from './components/Login';
import TopTracks from './components/TopTracks';
import NowPlaying from './components/NowPlaying';
import TopArtists from './components/TopArtists';
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
                    <TopTracks spotifyWebApi={spotifyWebApi} />
                    <NowPlaying spotifyWebApi={spotifyWebApi} />
                    <TopArtists spotifyWebApi={spotifyWebApi} />
                </div >
            )
        }



    }
}

export default App;
