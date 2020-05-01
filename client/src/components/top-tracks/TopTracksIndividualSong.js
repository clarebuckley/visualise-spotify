import React, { Component } from 'react';
import { playOrPausePreview } from '../../helpers/TrackPreviewHelper.js';
import { Pie, Bar } from 'react-chartjs-2';
import {Spring} from 'react-spring/renderprops';

/**
 * Responsible for displaying an individual track that the user selected.
 * Also gets the popularity of that track and displays it as a pie chart over the album art.
 * */
class TopTracksIndividualSong extends Component {
  constructor(){
    super();
    this.state = {
      averagePopularityText: "",
    }
  }

    calculateAveragePopularity = () =>{
      var sumOfPopularities = 0;
      for (var i = 0; i < this.props.popularityChart.datasets[0].data.length; i++) {
        sumOfPopularities += this.props.popularityChart.datasets[0].data[i];
      }
      var averagePopularity = sumOfPopularities/this.props.numberOfSongs;
      return averagePopularity
    }

    generateTextForAveragePopularity = (averagePopularity) =>{
      var averagePopularityText = "";
      if (averagePopularity<25) {
        averagePopularityText = "Hey, not all popular music is bad! Give it a try sometime."
      }else if (averagePopularity>=25 && averagePopularity<50) {
        averagePopularityText = "You mainly listen to less popular songs, you indiehead."
      }else if (averagePopularity>=50 && averagePopularity<75) {
        averagePopularityText = "This means you like to listen to well known tracks but you also like some underground tunes."
      }else if (averagePopularity>=75) {
        averagePopularityText = "You have no individual taste."
      }
      return averagePopularityText
    }

    render() {
        return (
          <div className="col-lg-8">
            {this.props.topTracks.slice(this.props.focusedSong,this.props.focusedSong+1).map((track) => (
              <div key={track.id} className="row">
                <Spring
                  from={{ opacity:0, marginTop: -500 }}
                  to={{ opacity:1, marginTop: 0 }}
                >
                  { props => (
                    <div style={props} className="col-lg-4">
                      <img className="img-responsive album-art center-image" src={track.album.images[0].url} alt=""/>
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
                        <div>
                          {track.artists.map((artist) => (
                            <h6 key={artist.id}><a href={artist.external_urls.spotify} className="top-tracks-artist"> {`${artist.name}`}</a></h6>
                          ))}
                        </div>
                        <h6>{track.album.name}</h6>
                        <audio id="song-preview">
                          <source src={track.preview_url} type="audio/ogg"/>
                        </audio>
                        <button className="play-btn" onClick={() => playOrPausePreview('song-preview')}>
                          <img alt="start/stop icon" className="play-pause" src="/pause-play-button.png" />
                        </button>
                      </div>
                    </div>
                  )}
                </Spring>
              </div>
            ))}
            <div className="margin-bottom col-lg-10 offset-lg-1">
              <Bar
                data={this.props.popularityChart}
                options={{
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero:true,
                        fontColor: 'white'
                      },
                    }],
                    xAxes: [{
                      display: false,
                      ticks: {
                        fontColor: 'white'
                      },
                    }]
                  },
                  title:{
                    display:true,
                    text:'Popularity of these Songs',
                    fontSize:16,
                    fontColor:'#ffffff'
                  },
                  legend:{
                    display:false,
                    position:'right',
                    labels:{
                      fontColor:'white'
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
            <div className="col-lg-12 popularity-text-container">
              <div>
                The average popularity score for these songs is {this.calculateAveragePopularity()}/100!
              </div>
              <div>
                {this.generateTextForAveragePopularity(this.calculateAveragePopularity())}
              </div>
            </div>
          </div>
        );
    }
}

export default TopTracksIndividualSong;
