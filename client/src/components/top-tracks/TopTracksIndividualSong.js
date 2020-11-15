import React, { Component } from 'react';
import { playOrPausePreview } from '../../helpers/TrackPreviewHelper.js';
import {
    calculateAveragePopularity,
    generateTextForAveragePopularity,
} from '../../helpers/PopularityChartHelper.js';
import { Bar } from 'react-chartjs-2';
import { Spring } from 'react-spring/renderprops';

/**
 * Responsible for displaying an individual track that the user selected.
 * Also gets the popularity of that track and displays it as a pie chart over the album art.
 * */
class TopTracksIndividualSong extends Component {
    constructor() {
        super();
        this.state = {
            averagePopularityText: '',
        };
    }

    // Clicking on a bar will take the user to view that artist
    handleClick = (mouseEvent, chartElement) => {
        let element = chartElement[0];
        if (element) {
            this.props.handleListClickEvent(element._index);
        }
    };

    render() {
        return (
            <div className="col-lg-8">
                {this.props.topTracks
                    .slice(this.props.focusedSong, this.props.focusedSong + 1)
                    .map((track) => (
                        <div key={track.id} className="row">
                            <Spring
                                from={{ opacity: 0, marginTop: -500 }}
                                to={{ opacity: 1, marginTop: 0 }}
                            >
                                {(props) => (
                                    <div style={props} className="col-lg-4">
                                        <a
                                            href={
                                                track.album.external_urls
                                                    .spotify
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                className="img-responsive album-art center-image"
                                                src={track.album.images[0].url}
                                                alt=""
                                            />
                                        </a>
                                    </div>
                                )}
                            </Spring>
                            <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                                {(props) => (
                                    <div style={props} className="col-md-8">
                                        <div className="song-text-container">
                                            <h3>
                                                <a
                                                    href={
                                                        track.external_urls
                                                            .spotify
                                                    }
                                                    className="top-tracks-song-info"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {track.name}
                                                </a>
                                            </h3>
                                            <div>
                                                {track.artists.map((artist) => (
                                                    <h6 key={artist.id}>
                                                        <a
                                                            href={
                                                                artist
                                                                    .external_urls
                                                                    .spotify
                                                            }
                                                            className="top-tracks-song-info"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >{`${artist.name}`}</a>
                                                    </h6>
                                                ))}
                                            </div>
                                            <i class="fas fa-compact-disc"></i>
                                            <h6>
                                                <a
                                                    href={
                                                        track.album
                                                            .external_urls
                                                            .spotify
                                                    }
                                                    className="top-tracks-song-info"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <b>{track.album.name}</b>
                                                </a>
                                            </h6>
                                            <audio id="song-preview">
                                                <source
                                                    src={track.preview_url}
                                                    type="audio/ogg"
                                                />
                                            </audio>
                                            <button
                                                className="play-btn"
                                                onClick={() =>
                                                    playOrPausePreview(
                                                        'song-preview'
                                                    )
                                                }
                                            >
                                                <img
                                                    alt="start/stop icon"
                                                    className="play-pause"
                                                    src="/pause-play-button.png"
                                                />
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
                                yAxes: [
                                    {
                                        ticks: {
                                            beginAtZero: true,
                                            fontColor: 'white',
                                        },
                                    },
                                ],
                                xAxes: [
                                    {
                                        display: false,
                                        ticks: {
                                            fontColor: 'white',
                                        },
                                    },
                                ],
                            },
                            title: {
                                display: true,
                                text: 'Popularity of these Songs',
                                fontSize: 16,
                                fontColor: '#ffffff',
                            },
                            legend: {
                                display: false,
                                position: 'right',
                                labels: {
                                    fontColor: 'white',
                                },
                            },
                            tooltips: {
                                callbacks: {
                                    label: function (tooltipItem) {
                                        return tooltipItem.yLabel;
                                    },
                                },
                            },
                            onClick: this.handleClick,
                        }}
                    />
                </div>
                <div className="col-lg-12 popularity-text-container">
                    <div>
                        The average popularity score for these songs is{' '}
                        {calculateAveragePopularity(
                            this.props.popularityChart.datasets[0].data,
                            this.props.numberOfSongs
                        )}
                        /100!
                    </div>
                    <div>
                        {generateTextForAveragePopularity(
                            calculateAveragePopularity(
                                this.props.popularityChart.datasets[0].data,
                                this.props.numberOfSongs
                            )
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default TopTracksIndividualSong;
