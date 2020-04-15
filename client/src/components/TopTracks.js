import React, { Component } from 'react';


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

  playOrPausePreview(){
    var song_preview = document.getElementById('song-preview');
    song_preview.volume = 0.1;
    if(song_preview.paused){
      song_preview.play();
    }else{
      song_preview.pause();
    }
  }

  selectSong(track_index){
    this.setState({
      focusedSong: track_index,
    })
  }

  autoplaySong(){
      var song_preview = this.ref.song;
      song_preview.volume = 0.1;
      song_preview.play();
      console.log('hi');
  }

  render(){
    this.getTopTracks(this.props.spotifyWebApi);
    return (
      <div className="App">
        <div><b>Top Songs of The Last 6 Months:</b></div>
        <div className="row">
          <div className="list-group col-md-3">
            {this.state.topTracks.map((track) => (
              <button onClick={() => this.selectSong(this.state.topTracks.indexOf(track))} className="list-group-item list-group-item-action" key={track.id}>{track.name}</button>
            ))}
          </div>
          <div className="col-sm-9">
            {this.state.topTracks.slice(this.state.focusedSong,this.state.focusedSong+1).map((track) => (
              <div key={track.id} className="row">
                <div className="col-lg-4">
                  <img className="img-responsive" src={track.album.images[0].url} style={{ width: 250 }} alt=""/>
                </div>
                <div className="col-lg-8">
                  <h3>{track.name}</h3>
                  <h5>By: {track.artists[0].name}</h5>
                  <h5>Album: {track.album.name}</h5>
                  <audio ref="song" id="song-preview">
                    <source src={track.preview_url} type="audio/ogg"/>
                  </audio>
                  <button onClick={() => this.playOrPausePreview()}>
                      Play/Pause Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default TopTracks;
