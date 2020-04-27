import React, { Component } from 'react';

/**
 * Responsible for displaying the popularity of the selected artist
 * */
class TopArtistPopularity extends Component {

    render() {
        return (
            <div className="artistPopularity">
                <p>The artist's popularity is calculated from the popularity of all the artist’s tracks. The popularity of each track is calculated based on the total number of plays the track has had and how recent those plays are.
Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. </p>
            </div>
        );
    }
}

export default TopArtistPopularity;
