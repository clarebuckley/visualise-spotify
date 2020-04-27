import React, { Component } from 'react';

/**
 * Responsible for displaying the similar artists of the selected artist
 * */
class TopArtistSimilarArtists extends Component {

    createNewPlaylist = () => {
        console.log("HIT");
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-success row" onClick={() => { this.createNewPlaylist(); }} data-toggle="modal" data-target="#successModalTopArtists">
                    Make Playlist From Similar Artists
                    </button>
                <div className="similarArtists">
                    {this.props.similarArtists .map((similarArtist) => (
                        <div key={similarArtist.id} className="similarArtistAlbumArt">
                            <img src={similarArtist.images[0].url} alt="album art" />
                            <p><a href={similarArtist.external_urls.spotify}>{similarArtist.name}</a></p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default TopArtistSimilarArtists;
