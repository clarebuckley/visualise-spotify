import React, { Component } from 'react';


class TopTracks extends Component {
  constructor(){
    super();
    this.state = {
      topTracks: {
        tracks: 'Not Checked',
        artists: 'Dunno',
      }
    }

  }

  //Grabs the 10 most popular songs and pushes them into an array.
  //The 'tracks' state is then updated to add this new array.
  getTopTracks(spotifyWebApi){
    var tracks = []
    spotifyWebApi.getMyTopTracks({limit : 10, time_range: 'medium_term'}).then((response) => {
      for (var i = 0; i < response.items.length-1; i++) {
        tracks.push(response.items[i].name)
      }
      this.setState({
        topTracks: {
          tracks: tracks,
          artists: 'Dunno Still',
        }
      })
    })
  }

  render(){
    return (
      <div className="App">
      <div>Top Song: { this.state.topTracks.tracks } </div>
      <div>By: { this.state.topTracks.artists } </div>
      <div>
      <img src={ this.state.topTracks.image } style={{width: 100}}/>
      </div>
      <button onClick={() => this.getTopTracks(this.props.spotifyWebApi)}>
      Check Top Song
      </button>
      </div>
    );
  }
}

export default TopTracks;
