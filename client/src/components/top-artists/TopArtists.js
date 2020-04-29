import React, { Component } from 'react';
import TopArtistsList from './TopArtistsList'
import TopArtistDetails from './TopArtistDetails';
import TopArtistsTimeRange from './TopArtistsTimeRange';
import TopArtistsResultLimit from './TopArtistsResultLimit';
import { getCurrentDate } from '../../helpers/DateHelper.js';
import { fileToBase64 } from '../../helpers/Base64ImageHelper.js';
import './TopArtists.css';

//Set the amount of similar artists to be displayed (MAX=20)
const similarArtistsReturnLimit = 9;

/**
 * Responsible for getting data for TopArtistDetails and TopArtistsLists
 * TODO: add better error handling, tests and general tidy-up
 * */
class TopArtists extends Component {
    constructor() {
        super();
        this.state = {
            topArtists: [],
            topArtistsTracks: [],
            timeRange: "medium_term",
            selectedArtist: 0,
            similarToSelectedArtist: [],
            dataHasLoaded: false,
            isFollowingArtist: false,
            resultLimit: 20
        }
    }

    componentDidMount() {
        this.getAllData();
    }

    getAllData = () => {
        //Need to get top artists before finding the top track for each artist
        this.getTopArtists(this.state.resultLimit).then((topArtists) => {
            this.getTopTracksForAllArtists(topArtists).then((topTracks) => {
                this.setState({
                    topArtists: topArtists,
                    topArtistsTracks: topTracks,
                    dataHasLoaded: true
                }, () => {
                    //Get additional data with an artistId for the first artist in the list
                    this.getSimilarArtists(similarArtistsReturnLimit, this.state.topArtists[0].id);
                });

            })
        })
    }

    //Get x top artists for this user
    getTopArtists = (numOfTopArtists) => {
        return new Promise(resolve => {
            this.props.spotifyWebApi.getMyTopArtists({ time_range: this.state.timeRange, limit: numOfTopArtists })
                .then((response) => {
                    return resolve(response.items);
                })
                .catch((err) => {
                    console.error(err);
                })
        })
    }

    //Get the state to show top tracks for all top artists
    getTopTracksForAllArtists = (artists) => {
        return new Promise(resolve => {
            var promises = [];
            for (let artist of artists) {
                promises.push(this.getSingleArtistTopTrack(artist.id))
            }
            Promise.all(promises).then((topTracks) => {
                return resolve(topTracks);
            })
        })

    }

    //Get the top track for a single artist
    getSingleArtistTopTrack = async (artistId) => {
        return new Promise(resolve => {
            //TODO: need to get rid of "GB" string
            this.props.spotifyWebApi.getArtistTopTracks(artistId, "GB", { limit: 1 })
                .then((response) => {
                    return resolve(response.tracks[0]);
                }).catch((err) => {
                    console.error(err);
                })
        })
    }

    //Get similar artists to the currently selected artist
    getSimilarArtists = (limit, artistId) => {
        this.props.spotifyWebApi.getArtistRelatedArtists(artistId)
            .then((response) => {
                var similarArtists = response.artists.slice(0, limit);
                this.setState({
                    similarToSelectedArtist: similarArtists,
                    dataHasLoaded: true
                })
            })
            .catch((err) => {
                console.error(err);
            })
    }

    //Check whether the user is following a given artist
    isFollowingArtist = (artistId) => {
        this.props.spotifyWebApi.isFollowingArtists([artistId])
            .then((response) => {
                this.setState({
                    isFollowingArtist: response[0],
                    dataHasLoaded: true
                })
            })
            .catch((err) => {
                console.error(err);
            })
    }

    //Helper function to set whether the data has been loaded
    setDataHasLoaded = (hasLoaded) => {
        this.setState({
            dataHasLoaded: hasLoaded
        })
    }

    //Need to load additional data for a given artist
    handleListClickEvent = (index) => {
        this.setState({
            selectedArtist: index,
            dataHasLoaded: false
        })
        this.getSimilarArtists(similarArtistsReturnLimit, this.state.topArtists[index].id);
        this.isFollowingArtist(this.state.topArtists[index].id);
    }

    //Spotify API returns data for long/medium/short term
    getTimeRangeInString = () => {
        switch (this.state.timeRange) {
            case "long_term":
                return "of All Time"
            case "medium_term":
                return "for the Past 6 Months"
            case "short_term":
                return "for the Past Month"
            default:
                return "INVALID TIME RANGE"
        }
    }

    setTimeRange = (newTimeRange) => {
        this.setState({
            timeRange: newTimeRange
        }, () => {
            this.getAllData()
        })
    }

    setResultLimit = (newResultLimit) => {
        this.setState({
            resultLimit: newResultLimit
        }, () => {
            this.getAllData();
        })
    }

    //Creates a new playlist for top artist songs
    createNewPlaylist = () => {
        var playlistName = `Songs by my Top ${this.state.resultLimit} Artists ${this.getTimeRangeInString()}`;
        var playlistDescription = `My ${this.state.resultLimit} Top Artists ${this.getTimeRangeInString()} as of ${getCurrentDate()}`

        this.props.spotifyWebApi.createPlaylist(this.props.userId, { name: playlistName, description: playlistDescription })
            .then((response) => {
                this.populatePlaylist(response.id);
                this.uploadPlaylistImage(response.id);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    //Populates the given playlist with songs by top artists
    populatePlaylist = (playlistId) => {
        var songUriList = [];
        for (let artistTrack of this.state.topArtistsTracks) {
            songUriList.push(artistTrack.uri)
        }
        this.props.spotifyWebApi.addTracksToPlaylist(playlistId, songUriList)
    }

    //Uploads a custom cover image to the given playlist
    uploadPlaylistImage = (playlistId) => {
        fileToBase64("top-artists-playlist-cover.jpeg", "../../../public/top-artists-playlist-cover.jpeg")
            .then((base64) => {
                console.log(base64);
                this.props.spotifyWebApi.uploadCustomPlaylistCoverImage(playlistId, base64)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            });
    }



    render() {
        if (!this.state.dataHasLoaded) { return <p>Loading data...</p> }
        return (
            <div className="TopArtists">
                <div id="successModal" class="modal fade" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <p>Successfully created playlist!</p>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <p class="popup-text">A playlist with songs by your top {this.state.resultLimit} artists {this.getTimeRangeInString()} has been created! Check your Spotify!</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="header">
                    <p>Your Top {this.state.resultLimit} Artists {this.getTimeRangeInString()}</p>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => { this.createNewPlaylist(); }}
                        data-toggle="modal"
                        data-target="#successModal">
                        Make A Playlist Of These Artists
                    </button>
                </div>
                <div className="row justify-content-md-center">
                    <TopArtistsTimeRange setTimeRange={this.setTimeRange}></TopArtistsTimeRange>
                    <TopArtistsResultLimit setResultLimit={this.setResultLimit}></TopArtistsResultLimit>
                </div>
                <div className="mainContent row justify-content-around">
                    <TopArtistsList
                        className="col-sm-4"
                        selectedArtist={this.state.selectedArtist}
                        topArtists={this.state.topArtists}
                        handleListClickEvent={this.handleListClickEvent}>
                    </TopArtistsList>
                    <TopArtistDetails
                        className="col-sm-8"
                        spotifyWebApi={this.props.spotifyWebApi}
                        artistImage={this.state.topArtists[this.state.selectedArtist].images[0].url}
                        artistName={this.state.topArtists[this.state.selectedArtist].name}
                        artistId={this.state.topArtists[this.state.selectedArtist].id}
                        followers={this.state.topArtists[this.state.selectedArtist].followers.total}
                        genres={this.state.topArtists[this.state.selectedArtist].genres}
                        similarArtists={this.state.similarToSelectedArtist}
                        isFollowingArtist={this.state.isFollowingArtist}
                        checkFollowingArtist={this.isFollowingArtist}
                        previewUrl={this.state.topArtistsTracks[this.state.selectedArtist].preview_url}
                        popularity={this.state.topArtists[this.state.selectedArtist].popularity}
                    >
                    </TopArtistDetails>
                </div>
            </div>
        );
    }
}

export default TopArtists;
