import React, { Component } from 'react';
import TopTracksTimeframe from './TopTracksTimeframe.js';
import TopTracksNumberOfSongs from './TopTracksNumberOfSongs.js';
import { playOrPausePreview } from '../../helpers/TrackPreviewHelper.js';
import { Pie } from 'react-chartjs-2';
import {Spring} from 'react-spring/renderprops';

/**
 * Responsible for displaying an individual track that the user selected.
 * Also gets the popularity of that track and displays it as a pie chart over the album art.
 * */
class TopTracksIndividualSong extends Component {
    render() {
        return (
          <div className="col-sm-8">
          {this.props.topTracks.slice(this.props.focusedSong,this.props.focusedSong+1).map((track) => (
            <div key={track.id} className="row">
              <Spring
                from={{ opacity:0, marginTop: -500 }}
                to={{ opacity:1, marginTop: 0 }}
              >
                { props => (
                  <div style={props} className="col-lg-4">
                    <img className="img-responsive album-art center-image" src={track.album.images[0].url} alt=""/>
                    <div className="overlay">
                    <Pie
                    data={this.props.popularityChart}
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
                      <button className="play-btn" onClick={() => playOrPausePreview('song-preview')}>
                        <img alt="start/stop icon" className="play-pause" src="/pause-play-button.png" />
                      </button>
                    </div>
                  </div>
                )}
              </Spring>
            </div>
          ))}
          </div>
        );
    }
}

export default TopTracksIndividualSong;
