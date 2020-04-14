import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class TopTracks extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      topTracks: {
        name: 'Not Checked',
        artists: 'Dunno',
      }
    }
    if(params.access_token){
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getTopTracks(){
    spotifyWebApi.getMyTopTracks().then((response) => {
      this.setState({
        topTracks: {
          name: response.items.name,
          artists: 'Dunno Still',
        }
      })
    })
  }

  render(){
    if(this.state.loggedIn){
      return (
        <div className="App">
          <div>Top Song: { this.state.topTracks.name } </div>
          <div>By: { this.state.topTracks.artists } </div>
          <div>
            <img src={ this.state.topTracks.image } style={{width: 100}}/>
          </div>
          <button onClick={() => this.getTopTracks()}>
            Check Top Song
          </button>
        </div>
      );
    }else{
      return null;
    }
  }
}

export default TopTracks;
