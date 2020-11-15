import React, { Component } from 'react';
import SimilarArtistsModal from './SimilarArtistsModal';
import {
    meet100TrackLimit,
    getTopTracksForArtists,
    uploadPlaylistImage,
} from '../../helpers/PlaylistHelper.js';

/**
 * Responsible for displaying the similar artists of the selected artist
 * */
class TopArtistSimilarArtists extends Component {
    //Creates a new playlist for top artist songs
    createNewPlaylist = (numOfArtists, numOfSongs) => {
        var playlistName = `Similar to ${this.props.mainArtist}`;
        var playlistDescription = `Songs I might like because they're by artists similar to ${this.props.mainArtist}`;

        this.props.spotifyWebApi
            .createPlaylist(this.props.userId, {
                name: playlistName,
                description: playlistDescription,
            })
            .then((response) => {
                this.populatePlaylist(response.id, numOfArtists, numOfSongs);
                uploadPlaylistImage(
                    this.props.spotifyWebApi,
                    response.id,
                    'similar-artists-playlist-cover.jpg'
                );
                //              //TODO >>> SUCCESS DIALOG AFTER EVERYTHING'S LOADED
            })
            .catch((err) => {
                console.error(err);
            });
    };

    //Populates the given playlist with songs by top artists
    populatePlaylist = (playlistId, numOfArtists, numOfSongs) => {
        var similarArtists = this.props.similarArtists.slice(0, numOfArtists);
        getTopTracksForArtists(
            similarArtists,
            numOfSongs,
            this.props.spotifyWebApi
        )
            .then((tracks) => {
                tracks = tracks.flat(1);
                var trackUris = [];
                for (let track of tracks) {
                    trackUris.push(track.uri);
                }
                if (trackUris.length > 100) {
                    var fullPlaylists = meet100TrackLimit(trackUris);
                    for (let fullPlaylist of fullPlaylists) {
                        this.props.spotifyWebApi
                            .addTracksToPlaylist(playlistId, fullPlaylist)
                            .catch((err) => {
                                console.error(err);
                            });
                    }
                } else {
                    this.props.spotifyWebApi
                        .addTracksToPlaylist(playlistId, trackUris)
                        .catch((err) => {
                            console.error(err);
                        });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    render() {
        return (
            <div>
                <SimilarArtistsModal
                    createNewPlaylist={this.createNewPlaylist}
                />

                <div className="row justify-content-md-center">
                    <button
                        type="button"
                        className="btn btn-success"
                        data-toggle="modal"
                        data-target="#similarArtistsModal"
                    >
                        Make Playlist From Similar Artists
                    </button>
                </div>
                <div className="similarArtists">
                    {this.props.similarArtists.map((similarArtist) => (
                        <div
                            key={similarArtist.id}
                            className="similarArtistAlbumArt"
                        >
                            {similarArtist.images.length > 0 && (
                                <img
                                    src={similarArtist.images[0].url}
                                    alt="album art"
                                />
                            )}
                            {similarArtist.images.length === 0 && (
                                <img
                                    src="./missing-artwork.jpg"
                                    alt="album art"
                                />
                            )}
                            <p>
                                <a href={similarArtist.external_urls.spotify}>
                                    {similarArtist.name}
                                </a>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default TopArtistSimilarArtists;
