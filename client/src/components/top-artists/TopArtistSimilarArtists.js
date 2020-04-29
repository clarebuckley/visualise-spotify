import React, { Component } from 'react';
import SelectNumSongsModal from './SelectNumSongsModal';
import { getCurrentDate } from '../../helpers/DateHelper.js';

/**
 * Responsible for displaying the similar artists of the selected artist
 * */
class TopArtistSimilarArtists extends Component {


    //Creates a new playlist for top artist songs
    createNewPlaylist = (numOfArtists, numOfSongs) => {
        var playlistName = `Songs I might like`;
        var playlistDescription = `Songs I might like, based on similar artists to my top  ${this.state.resultLimit} artists ${this.props.getTimeRangeInString()} as of ${getCurrentDate()}`

        this.props.spotifyWebApi.createPlaylist(this.props.userId, { name: playlistName, description: playlistDescription })
            .then((response) => {
                this.populatePlaylist(response.id, numOfSongs);
         //       uploadPlaylistImage(this.props.spotifyWebApi, response.id, "top-artists-playlist-cover.jpeg");
                //TODO >>> SUCCESS DIALOG AFTER EVERYTHING'S LOADED
            })
            .catch((err) => {
                console.error(err);
            });
    }

    //Populates the given playlist with songs by top artists
    populatePlaylist = (playlistId, numOfSongs) => {
        
    }


    render() {
        return (
            <div>
                <SelectNumSongsModal type="similarArtists" createNewPlaylist={this.createNewPlaylist} />

                <div className="row justify-content-md-center">
                    <button
                        type="button"
                        className="btn btn-success"
                        data-toggle="modal"
                        data-target="#selectNumSongsModal">
                        Make Playlist From Similar Artists
                    </button>
                </div>
                <div className="similarArtists">
                    {this.props.similarArtists.map((similarArtist) => (
                        <div key={similarArtist.id} className="similarArtistAlbumArt">
                            {similarArtist.images.length > 0 &&
                                <img src={similarArtist.images[0].url} alt="album art" />
                            }
                            {similarArtist.images.length === 0 &&
                                <img src="./missing-artwork.jpg" alt="album art" />
                            }
                            <p><a href={similarArtist.external_urls.spotify}>{similarArtist.name}</a></p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default TopArtistSimilarArtists;
