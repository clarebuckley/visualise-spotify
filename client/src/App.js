import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: 'Not Checked',
        artists: 'Dunno',
        image: ''
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

  getNowPlaying(){
    spotifyWebApi.getMyCurrentPlaybackState().then((response) => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          artists: response.item.artists[0].name,
          image: response.item.album.images[0].url
        }
      })
    })
  }

  render(){
    if(this.state.loggedIn){
      return (
        <div className="App">
          <div>Now Playing: { this.state.nowPlaying.name } </div>
          <div>By: { this.state.nowPlaying.artists } </div>
          <div>
            <img src={ this.state.nowPlaying.image } style={{width: 100}}/>
          </div>
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        </div>
      );
    }else{
      return (
        <div className="App">
          <a href="http://localhost:8888/login"> 
            <button>Login With Spotify</button>
          </a>
        </div>
      );
    }

  }
}

export default App;
