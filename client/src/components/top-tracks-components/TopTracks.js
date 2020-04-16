import React, { Component } from 'react';
import './TopTracks.css';
import {Spring} from 'react-spring/renderprops';
import { playOrPausePreview, autoplaySong } from '../TrackPreviewHelper.js';

class TopTracks extends Component {
  constructor(){
    super();
    this.state = {
      topTracks: [],
      focusedSong: 0,
    }

  }

  //Grabs the 10 most popular songs and pushes them into an array.
  //The 'tracks' state is then updated to add this new array.
  getTopTracks(spotifyWebApi){
    var tracks = []
    spotifyWebApi.getMyTopTracks({limit : 10, time_range: 'medium_term'}).then((response) => {
      tracks = response.items;
      this.setState({
        topTracks: tracks,
      })
    })
    }

  selectSong(track_index) {
    this.setState({
        focusedSong: track_index,
    })
  }

  render(){
    this.getTopTracks(this.props.spotifyWebApi);
    return (
      <div className="App">
        <div><b>Top Songs of The Last 6 Months:</b></div>
        <div className="row">
          <div className="list-group col-md-3 topSongList">
            {this.state.topTracks.map((track) => (
              <button onClick={() => this.selectSong(this.state.topTracks.indexOf(track))} className="list-group-item list-group-item-action" key={track.id}>{track.name}</button>
            ))}
          </div>
          <div className="col-sm-9">
            {this.state.topTracks.slice(this.state.focusedSong,this.state.focusedSong+1).map((track) => (
              <div key={track.id} className="row">
                <Spring
                  from={{ opacity:0, marginTop: -500 }}
                  to={{ opacity:1, marginTop: 0 }}
                >
                  { props => (
                    <div style={props} className="col-lg-4">
                      <img className="img-responsive" src={track.album.images[0].url} style={{ width: 250 }} alt=""/>
                    </div>
                  )}
                </Spring>
                <Spring
                  from={{ opacity:0 }}
                  to={{ opacity:1 }}
                >
                  { props => (
                    <div style={props} className="col-lg-8">
                      <h3>{track.name}</h3>
                      <h5>By: {track.artists[0].name}</h5>
                      <h5>Album: {track.album.name}</h5>
                      <audio ref="song" id="song-preview">
                        <source src={track.preview_url} type="audio/ogg"/>
                      </audio>
                      <button onClick={() => playOrPausePreview('song-preview')}>
                        Play/Pause Preview
                      </button>
                    </div>
                  )}
                </Spring>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default TopTracks;
