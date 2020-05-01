import React, { Component } from 'react';
import './TopTracks.css';
import TopTracksHeader from './TopTracksHeader.js';
import TopTracksSongList from './TopTracksSongList.js';
import TopTracksIndividualSong from './TopTracksIndividualSong.js';
import TopTracksTimeframe from './TopTracksTimeframe.js';
import TopTracksNumberOfSongs from './TopTracksNumberOfSongs.js';

class TopTracks extends Component {
  constructor(){
    super();
    this.state = {
      topTracks: [],
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

  componentDidMount(){
    this.getTopTracks(this.props.spotifyWebApi);
  }


  /**
   * Grabs the most popular songs of the user (depending on the timeframe) and pushes them into an array.
   * The 'topTracks' state is then updated to add this new array.
   */
  getTopTracks = (spotifyWebApi) =>{
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
      })
    })
  }

  /**
   * This function is used to select the song to view.
   */
  selectSong = (track) =>{
    this.setState({
        focusedSong: this.state.topTracks.indexOf(track),
    },
    () => {
      this.getSongPopularity(track.popularity);
    });
  }

  /**
   * Sets the number of songs that the user wishes to see.
   */
  selectNumberOfSongs = (numberOfSongs) => {
    this.setState({
        numberOfSongs: numberOfSongs,
        focusedSong: 0,
    },
    () => {
        this.getTopTracks(this.props.spotifyWebApi);
    });
  }

  /**
   * Get the popularity of a specific song and update the 'popularityChart' state.
   */
  getSongPopularity = (popularity) =>{
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

  /**
   * Select the timeframe for the user's top tracks.
   * 'short_term' = Top Tracks of The Last 1 Month.
   * 'medium_term' = Top Tracks of The Last 6 Months.
   * 'long_term' = Top Tracks of All Time.
   */
  selectTimeframe = (timeframe) => {
    switch (timeframe) {
      case 'short_term':
        this.setState({
          titleTimeframe: 'The Last Month',
          timeframe: timeframe,
        },
        () => {
            this.getTopTracks(this.props.spotifyWebApi);
        });

        break;
      case 'medium_term':
        this.setState({
          titleTimeframe: 'The Last 6 Months',
          timeframe: timeframe,
        },
        () => {
            this.getTopTracks(this.props.spotifyWebApi);
        });

        break;
      case 'long_term':
        this.setState({
          titleTimeframe: 'All Time',
          timeframe: timeframe,
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
        <TopTracksHeader
          spotifyWebApi={this.props.spotifyWebApi}
          topTracks={this.state.topTracks}
          userId={this.props.userId}
          selectTimeframe={this.selectTimeframe}
          titleTimeframe={this.state.titleTimeframe}
          numberOfSongs={this.state.numberOfSongs}
          selectNumberOfSongs={this.selectNumberOfSongs}
        >
        </TopTracksHeader>
        <div className="row reverse-for-mobile margin-bottom margin-top">
          <TopTracksSongList
            topTracks={this.state.topTracks}
            selectSong={this.selectSong}
            focusedSong={this.state.focusedSong}
          >
          </TopTracksSongList>
          <TopTracksIndividualSong
            topTracks={this.state.topTracks}
            focusedSong={this.state.focusedSong}
            popularityChart={this.state.popularityChart}
            selectTimeframe={this.selectTimeframe}
            titleTimeframe={this.state.titleTimeframe}
            numberOfSongs={this.state.numberOfSongs}
            selectNumberOfSongs={this.selectNumberOfSongs}
          >
          </TopTracksIndividualSong>
        </div>
      </div>
    );
  }
}

export default TopTracks;
