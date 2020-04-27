import React, { Component } from 'react';

/**
 * Responsible for displaying the similar artists of the selected artist
 * */
class TopArtistSimilarArtists extends Component {

    render() {
        return (
            <div className="similarArtists">
                {this.props.similarArtists.map((similarArtist) => (
                    <div key={similarArtist.id} className="similarArtistAlbumArt">
                        <img src={similarArtist.images[0].url} alt="album art" />
                        <p><a href={similarArtist.external_urls.spotify}>{similarArtist.name}</a></p>
                    </div>
                ))}
            </div>
        );
    }
}

export default TopArtistSimilarArtists;
