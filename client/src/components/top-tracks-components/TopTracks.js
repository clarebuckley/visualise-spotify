import React, { Component } from 'react';
import './TopTracks.css';
import TopTracksHeader from './TopTracksHeader.js';
import TopTracksSongList from './TopTracksSongList.js';
import TopTracksIndividualSong from './TopTracksIndividualSong.js';
import {Spring} from 'react-spring/renderprops';
import { playOrPausePreview } from '../../helpers/TrackPreviewHelper.js';
import { getCurrentDate } from '../../helpers/DateHelper.js';
import { Pie } from 'react-chartjs-2';

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


  //Grabs the most popular songs of the user and pushes them into an array.
  //The 'topTracks' state is then updated to add this new array.
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

  selectSong = (track) =>{
    this.setState({
        focusedSong: this.state.topTracks.indexOf(track),
    },
    () => {
      this.getSongPopularity(track.popularity);
    });
  }

  selectNumberOfSongs = (numberOfSongs) => {
    this.setState({
        numberOfSongs: numberOfSongs,
    },
    () => {
        this.getTopTracks(this.props.spotifyWebApi);
    });
  }

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

  selectTimeframe = (timeframe) => {
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
        <TopTracksHeader
          numberOfSongs={this.state.numberOfSongs}
          titleTimeframe={this.state.titleTimeframe}
          spotifyWebApi={this.props.spotifyWebApi}
          topTracks={this.state.topTracks}
          userId={this.props.userId}
        >
        </TopTracksHeader>
        <div className="row reverse-for-mobile margin-bottom">
          <TopTracksSongList
            topTracks={this.state.topTracks}
            selectSong={this.selectSong}
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
