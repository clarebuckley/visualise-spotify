import React, { Component } from 'react';


class TopTracks extends Component {
  constructor(){
    super();
    this.state = {
      topTracks: [],
      focusedSong: '',
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

  getFocusedSong(){

  }

  render(){
    this.getTopTracks(this.props.spotifyWebApi);
    //console.debug(topTracksArray);
    return (
      <div className="App">
        <div><b>Top Songs:</b></div>
        <div className="row">
          <div className="list-group col-lg-3">
            {this.state.topTracks.map((track) => (
              <a href="#" className="list-group-item list-group-item-action" key={track.id}>{track.name}</a>
            ))}
          </div>
          <div className="col-lg-9">
            {this.state.topTracks.map((track) => (
              <div key={track.id} className="row">
                <div className="col-lg-4">
                  <img src={track.album.images[0].url} style={{ width: 250 }}/>
                </div>
                <div className="col-lg-8">
                  <h3>{track.name}</h3>
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
