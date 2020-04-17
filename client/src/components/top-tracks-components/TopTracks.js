import React, { Component } from 'react';
import './TopTracks.css';
import {Spring} from 'react-spring/renderprops';
import { playOrPausePreview, autoplaySong, muteSong } from '../../helpers/TrackPreviewHelper.js';
import { Pie } from 'react-chartjs-2';

class TopTracks extends Component {
  constructor(){
    super();
    this.state = {
      topTracks: [],
      focusedSong: 0,
      popularityChart:{
        datasets:[
          {
            data: [10, 90],
            backgroundColor: ["#0074D9"],
          },
        ],
      },
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

  getSongPopularity(){
    this.setState({
      popularityChart:{
        datasets:[
          {
            data: [10, 20, 30],
          },
        ],
      }
    });
  }

  render(){
    this.getTopTracks(this.props.spotifyWebApi);
    return (
      <div className="App">
        <div className="header">Your Top 10 Songs of The Last 6 Months</div>
        <div className="row">
          <div className="list-group col-md-3 topSongList margin-top">
            {this.state.topTracks.map((track) => (
              <button onClick={() => { this.selectSong(this.state.topTracks.indexOf(track));}} className="song-card" key={track.id}>
                {<img className="img-responsive float-left" src={track.album.images[0].url} style={{ width: 50 }} alt=""/>}
                <p className="song-card-text vertical-center">{track.name}</p>
              </button>
            ))}

          </div>

          <div className="col-sm-9 margin-top">
            {this.state.topTracks.slice(this.state.focusedSong,this.state.focusedSong+1).map((track) => (
              <div key={track.id} className="row">
                <Spring
                  from={{ opacity:0, marginTop: -500 }}
                  to={{ opacity:1, marginTop: 0 }}
                >
                  { props => (
                    <div style={props} className="col-lg-4">
                      <img className="img-responsive album-art" src={track.album.images[0].url} alt=""/>
                      <img className="overlay" onClick={() => { playOrPausePreview('song-preview') }} src="https://image.flaticon.com/icons/svg/27/27185.svg" />
                    </div>
                  )}
                </Spring>
                <Spring
                  from={{ opacity:0 }}
                  to={{ opacity:1 }}
                >
                  { props => (
                    <div style={props} className="col-sm-7 song-text-container">
                      <div className="song-text">
                        <h3>{track.name}</h3>
                        <h5>By: {track.artists[0].name}</h5>
                        <h5>Album: {track.album.name}</h5>
                        <audio id="song-preview">
                          <source src={track.preview_url} type="audio/ogg"/>
                        </audio>
                        <button onClick={() => muteSong('song-preview')}>
                          Mute
                        </button>
                      </div>
                    </div>
                  )}
                </Spring>
              </div>
            ))}
            <div className="margin-top">
            <Pie
                data={this.state.popularityChart}
                options={{
                  title:{
                    display:true,
                    text:'Song Popularity',
                    fontSize:25,
                    fontColor:'#ffffff'
                  },
                  legend:{
                    display:true,
                    position:'right',
                    labels:{
                      fontColor:'#ffffff'
                    }
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopTracks;
