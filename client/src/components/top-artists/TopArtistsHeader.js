import React, { Component } from 'react';
import TimeframeDropdown from '../dropdown-options/TimeframeDropdown.js';
import NumberOfResultsDropdown from '../dropdown-options/NumberOfResultsDropdown';

import TopArtistsModal from './TopArtistsModal';

/**
 * Responsible for controlling the timeframe and number of results for top artists display
 * */
class TopArtistsHeader extends Component {
    constructor() {
        super();
        this.state = {
            playlistCreatedText: '',
        };
    }

    render() {
        return (
            <div className="header">
                <TopArtistsModal
                    createNewPlaylist={this.props.createNewPlaylist}
                />

                <div className="row col-lg-12 offset-lg-4">
                    <p>Your Top</p>
                    <div className="margin-right margin-left">
                        <NumberOfResultsDropdown
                            numberOfResults={this.props.resultLimit}
                            selectNumberOfResults={this.props.setResultLimit}
                        ></NumberOfResultsDropdown>
                    </div>
                    <p>Artists of</p>
                    <div className="margin-right margin-left">
                        <TimeframeDropdown
                            selectTimeframe={this.props.setTimeRange}
                            titleTimeframe={this.props.titleTimeframe}
                            isLoaded={this.props.isLoaded}
                        ></TimeframeDropdown>
                    </div>
                </div>
                <button
                    type="button"
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target="#topArtistsModal"
                >
                    Make A Playlist Of These Artists
                </button>
            </div>
        );
    }
}

export default TopArtistsHeader;
