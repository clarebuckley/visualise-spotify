import React, { Component } from 'react';
import { playOrPausePreview } from '../../helpers/TrackPreviewHelper.js';
import { calculateAveragePopularity, generateTextForAveragePopularity } from '../../helpers/PopularityChartHelper.js';
import { Pie, Bar } from 'react-chartjs-2';
import { Spring } from 'react-spring/renderprops';

/**
 * Responsible for displaying an individual track that the user selected.
 * Also gets the popularity of that track and displays it as a pie chart over the album art.
 * */
class TopTracksIndividualSong extends Component {
    constructor() {
        super();
        this.state = {
            averagePopularityText: "",
        }
    }


    render() {
        return (
            <div className="col-lg-8">
                {this.props.topTracks.slice(this.props.focusedSong, this.props.focusedSong + 1).map((track) => (
                    <div key={track.id} className="row">
                        <Spring
                            from={{ opacity: 0, marginTop: -500 }}
                            to={{ opacity: 1, marginTop: 0 }}
                        >
                            {props => (
                                <div style={props} className="col-lg-4">
                                    <img className="img-responsive album-art center-image" src={track.album.images[0].url} alt="" />
                                </div>
                            )}
                        </Spring>
                        <Spring
                            from={{ opacity: 0 }}
                            to={{ opacity: 1 }}
                        >
                            {props => (
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
                                            <source src={track.preview_url} type="audio/ogg" />
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
                                        beginAtZero: true,
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
                            title: {
                                display: true,
                                text: 'Popularity of these Songs',
                                fontSize: 16,
                                fontColor: '#ffffff'
                            },
                            legend: {
                                display: false,
                                position: 'right',
                                labels: {
                                    fontColor: 'white'
                                }
                            },
                            tooltips: {
                                callbacks: {
                                    label: function (tooltipItem) {
                                        return tooltipItem.yLabel;
                                    }
                                }
                            }
                        }}
                    />
                </div>
                <div className="col-lg-12 popularity-text-container">
                    <div>
                        The average popularity score for these songs is {calculateAveragePopularity(this.props.popularityChart.datasets[0].data, this.props.numberOfSongs)}/100!
              </div>
                    <div>
                        {generateTextForAveragePopularity(calculateAveragePopularity(this.props.popularityChart.datasets[0].data, this.props.numberOfSongs))}
                    </div>
                </div>
            </div>
        );
    }
}

export default TopTracksIndividualSong;
