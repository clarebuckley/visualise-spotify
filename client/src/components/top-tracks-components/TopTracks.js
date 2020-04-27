import React, { Component } from 'react';
import './TopTracks.css';
import {Spring} from 'react-spring/renderprops';
import { playOrPausePreview, muteSong } from '../../helpers/TrackPreviewHelper.js';
import { Pie } from 'react-chartjs-2';

class TopTracks extends Component {
  constructor(){
    super();
    this.state = {
      topTracks: [],
      userDetails: [],
      songsForNewPlaylist: [],
      focusedSong: 0,
      numberOfSongs: 10,
      timeframe: 'medium_term',
      titleTimeframe: 'The Last 6 Months',
      popularityChart:{
        datasets:[
          {
            data: [0, 0],
            backgroundColor: ["#0074D9"],
          },
        ],
      },
    }
  }

  getCurrentDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    return today
  }

  componentDidMount(){
    this.getTopTracks(this.props.spotifyWebApi);
    this.getUserDetails(this.props.spotifyWebApi);
  }

  getUserDetails(spotifyWebApi){
    spotifyWebApi.getMe()
    .then((response) => {
      this.setState({
        userDetails: response,
      })
    })
  }

  //Grabs the 10 most popular songs and pushes them into an array.
  //The 'tracks' state is then updated to add this new array.
  getTopTracks(spotifyWebApi){
    var tracks = []
    spotifyWebApi.getMyTopTracks({limit : this.state.numberOfSongs, time_range: this.state.timeframe}).then((response) => {
      tracks = response.items;
      this.setState({
        topTracks: tracks,
        popularityChart:{
          datasets:[
            {
              data: [tracks[this.state.focusedSong].popularity, 100-tracks[this.state.focusedSong].popularity],
            },
          ],
        },
        songsForNewPlaylist: response,
      })
    })
  }

  selectSong(track_index) {
    this.setState({
        focusedSong: track_index,
    })
  }

  selectNumberOfSongs(numberOfSongs){
    this.setState({
        numberOfSongs: numberOfSongs,
    },
    () => {
        this.getTopTracks(this.props.spotifyWebApi);
    });
  }

  getSongPopularity(popularity){
    this.setState({
      popularityChart:{
        datasets:[
          {
            data: [popularity, 100-popularity],
          },
        ],
      }
    });
  }

  createNewPlaylist(spotifyWebApi){
    var songUriList = []
    spotifyWebApi.createPlaylist(this.state.userDetails.id, {name:`Top ${this.state.numberOfSongs} Songs of ${this.state.titleTimeframe}`, description:`These are your Top ${this.state.numberOfSongs} Songs of ${this.state.titleTimeframe} as of ${this.getCurrentDate()}`}).then((response)=>{
      for (var i = 0; i < this.state.numberOfSongs; i++) {
        songUriList.push(this.state.songsForNewPlaylist.items[i].uri)
      }
      spotifyWebApi.addTracksToPlaylist(response.id, songUriList)
    })
  }

  selectTimeframe(timeframe){
    this.setState({
      timeframe: timeframe,
    })
    switch (timeframe) {
      case 'short_term':
        this.setState({
          titleTimeframe: 'The Last Month',
        },
        () => {
            this.getTopTracks(this.props.spotifyWebApi);
        });

        break;
      case 'medium_term':
        this.setState({
          titleTimeframe: 'The Last 6 Months',
        },
        () => {
            this.getTopTracks(this.props.spotifyWebApi);
        });

        break;
      case 'long_term':
        this.setState({
          titleTimeframe: 'All Time',
        },
        () => {
            this.getTopTracks(this.props.spotifyWebApi);
        });

        break;
      default:
    }
  }

  render(){
    return (
      <div className="App">
        <div className="header">
          <p>Your Top {this.state.numberOfSongs} Songs of {this.state.titleTimeframe}</p>
          <button type="button" className="btn btn-success" onClick={() => { this.createNewPlaylist(this.props.spotifyWebApi);}} data-toggle="modal" data-target="#myModal">
            Add These Songs To Playlist
          </button>
          <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                  <p class="popup-text">A playlist with your Top {this.state.numberOfSongs} songs of {this.state.titleTimeframe} has been created! Check your Spotify!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row reverse-for-mobile margin-bottom">
          <div className="list-group col-lg-4 top-song-list margin-top">
            {this.state.topTracks.map((track) => (
              <button onClick={() => {this.getSongPopularity(track.popularity); this.selectSong(this.state.topTracks.indexOf(track));}} className="song-card" key={track.id}>
                {<img className="img-responsive float-left" src={track.album.images[0].url} style={{ width: 50 }} alt=""/>}
                <p className="song-card-text vertical-center">{track.name}</p>
              </button>
            ))}
          </div>
          <div className="col-sm-8 margin-top">
            {this.state.topTracks.slice(this.state.focusedSong,this.state.focusedSong+1).map((track) => (
              <div key={track.id} className="row">
                <Spring
                  from={{ opacity:0, marginTop: -500 }}
                  to={{ opacity:1, marginTop: 0 }}
                >
                  { props => (
                    <div style={props} className="col-lg-4">
                      <img className="img-responsive album-art" src={track.album.images[0].url} alt=""/>
                      <div className="overlay">
                      <Pie
                      data={this.state.popularityChart}
                      options={{
                        title:{
                          display:true,
                          text:'Song Popularity',
                          fontSize:16,
                          fontColor:'#ffffff'
                        },
                        legend:{
                          display:false,
                          position:'right',
                          labels:{
                            fontColor:'#ffffff'
                          }
                        },
                        tooltips: {
                          callbacks: {
                            label: function(tooltipItem) {
                              return tooltipItem.yLabel;
                            }
                          }
                        }
                      }}
                      />
                      </div>
                    </div>
                  )}

                </Spring>
                <Spring
                  from={{ opacity:0 }}
                  to={{ opacity:1 }}
                >
                  { props => (
                    <div style={props} className="col-md-8">
                      <div className="song-text-container">
                        <h3>{track.name}</h3>
                        <h5>By: {track.artists[0].name}</h5>
                        <h5>Album: {track.album.name}</h5>
                        <audio id="song-preview">
                          <source src={track.preview_url} type="audio/ogg"/>
                        </audio>
                        <button onClick={() => playOrPausePreview('song-preview')}>
                          Play/Pause
                        </button>
                      </div>
                    </div>
                  )}
                </Spring>
                <div className="col-lg-12">
                  <button className="btn btn-secondary margin-right margin-bottom" onClick={() => { this.selectTimeframe('short_term'); }}>1 Month</button>
                  <button className="btn btn-secondary margin-right margin-bottom" onClick={() => { this.selectTimeframe('medium_term'); }}>6 Months</button>
                  <button className="btn btn-secondary margin-right margin-bottom" onClick={() => { this.selectTimeframe('long_term'); }}>All Time</button>
                </div>
                <div className="col-lg-12">
                  <div className="dropdown">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                      {this.state.numberOfSongs} Songs
                    </button>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#" onClick={() => { this.selectNumberOfSongs(5); }}>5</a>
                      <a className="dropdown-item" href="#" onClick={() => { this.selectNumberOfSongs(10); }}>10</a>
                      <a className="dropdown-item" href="#" onClick={() => { this.selectNumberOfSongs(20); }}>20</a>
                      <a className="dropdown-item" href="#" onClick={() => { this.selectNumberOfSongs(30); }}>30</a>
                      <a className="dropdown-item" href="#" onClick={() => { this.selectNumberOfSongs(40); }} >40</a>
                      <a className="dropdown-item" href="#" onClick={() => { this.selectNumberOfSongs(50); }}>50</a>
                    </div>
                  </div>
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
