import React, { Component } from 'react';
import TopArtistsList from './TopArtistsList'
import TopArtistDetails from './TopArtistDetails';
import TopArtistsTimeRange from './TopArtistsTimeRange';
import TopArtistsResultLimit from './TopArtistsResultLimit';
import TopArtistsModal from './TopArtistsModal';
import SuccessModal from '../modals/SuccessModal.js';
import ErrorModal from '../modals/ErrorModal.js';
import ErrorPage from '../../ErrorPage';
import { getCurrentDate } from '../../helpers/DateHelper.js';
import { uploadPlaylistImage, meet100TrackLimit, getTopTracksForArtists } from '../../helpers/PlaylistHelper.js';
import './TopArtists.css';

//Set the amount of similar artists to be displayed (MAX=20)
const similarArtistsReturnLimit = 20;

/**
 * Responsible for getting data for TopArtistDetails and TopArtistsLists
 * TODO: add better error handling, tests and general tidy-up, use success/error modals after promises are returned
 * */
class TopArtists extends Component {
    constructor() {
        super();
        this.state = {
            //List of top artists, used in TopArtistsList
            topArtists: [],
            //One song from each top artist, used for song preview in TopArtistDetails
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
            getTopTracksForArtists(topArtists, 1, this.props.spotifyWebApi)
                .then((topTracks) => {
                    this.setState({
                        topArtists: topArtists,
                        topArtistsTracks: topTracks,
                        dataHasLoaded: true
                    }, () => {
                        //Get additional data with an artistId for the first artist in the list
                        this.getSimilarArtists(similarArtistsReturnLimit, this.state.topArtists[0].id);
                    });

                })
                .catch((err) => {
                    console.error(err);
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

    //Creates a new playlist for top artist songs
    createNewPlaylist = (numOfSongs) => {
        var playlistName = `Songs by my Top ${this.state.resultLimit} Artists ${this.getTimeRangeInString()}`;
        var playlistDescription = `Top ${numOfSongs} song(s) by my ${this.state.resultLimit} top artists ${this.getTimeRangeInString()} as of ${getCurrentDate()}`

        this.props.spotifyWebApi.createPlaylist(this.props.userId, { name: playlistName, description: playlistDescription })
            .then((response) => {
                this.populatePlaylist(response.id, numOfSongs);
                uploadPlaylistImage(this.props.spotifyWebApi, response.id, "top-artists-playlist-cover.jpeg");
                //TODO >>> SUCCESS DIALOG AFTER EVERYTHING'S LOADED
            })
            .catch((err) => {
                console.error(err);
            });
    }

    //Populates the given playlist with songs by top artists
    populatePlaylist = (playlistId, numOfSongs) => {
        getTopTracksForArtists(this.state.topArtists, numOfSongs, this.props.spotifyWebApi)
            .then((tracks) => {
                tracks = tracks.flat(1);
                var trackUris = [];
                for (let track of tracks) {
                    trackUris.push(track.uri);
                }
                if (trackUris.length > 100) {
                    var fullPlaylists = meet100TrackLimit(trackUris);
                    for (let fullPlaylist of fullPlaylists) {
                        this.props.spotifyWebApi.addTracksToPlaylist(playlistId, fullPlaylist)
                            .catch((err) => {
                                console.error(err);
                            })
                    }
                } else {
                    this.props.spotifyWebApi.addTracksToPlaylist(playlistId, trackUris)
                        .catch((err) => {
                            console.error(err);
                        })
                }
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
                return "of the Past 6 Months"
            case "short_term":
                return "of the Past Month"
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

    getSuccessDescription = () => {
        return `A playlist with songs by your top ${this.state.resultLimit} artists ${this.getTimeRangeInString()} has been created! Check your Spotify!`
    }

    getErrorDescription = () => {
        return `There was an error making your playlist, please try again! If this error continues, please contact Clare or Thavi for help :)`;
    }


    render() {
        if (!this.state.dataHasLoaded) {
            return (
                <ErrorPage logOut={this.props.logOut} />
            )
        }
        else {
            return (
                <div className="TopArtists">
                    <SuccessModal descriptionText={this.getSuccessDescription()} />
                    <ErrorModal descriptionText={this.getErrorDescription()} />
                    <TopArtistsModal createNewPlaylist={this.createNewPlaylist} />

                    <div className="header">
                        <p>Your Top {this.state.resultLimit} Artists {this.getTimeRangeInString()}</p>
                        <button
                            type="button"
                            className="btn btn-success"
                            data-toggle="modal"
                            data-target="#topArtistsModal">
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
                            getTimeRangeInString={this.getTimeRangeInString}
                            userId={this.props.userId}
                        >
                        </TopArtistDetails>
                    </div>
                </div>
            );
        }
    }
}

export default TopArtists;
