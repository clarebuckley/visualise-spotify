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
                    <div>
                        <NowPlaying spotifyWebApi={spotifyWebApi} />
                        <br />
                    </div>
                    <div>
                        <TopArtists spotifyWebApi={spotifyWebApi} />
                        <br /><br /><br />
                    </div>
                    <div>
                        <TopTracks spotifyWebApi={spotifyWebApi} />
                        <br /><br /><br />
                    </div>
                    <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                </div >
            )
        }
    }
}

export default App;
