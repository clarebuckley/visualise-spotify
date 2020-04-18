import React, { Component } from 'react';
import './TopArtists.css';
import { playOrPausePreview } from '../../helpers/TrackPreviewHelper.js';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class TopArtists extends Component {
    constructor() {
        super();
        this.state = {
            topArtists: [],
            topArtistsTracks: [],
            timeRange: "medium_term",
            selectedArtist: 0,
            similarToSelectedArtist: [],
            isFollowingSelectedArtist: false,
            dataHasLoaded: false
        }
    }

    componentDidMount() {
        this.getAllData();
    }

    getAllData = () => {
        //Need to get top artists before finding the top track for each artist
        this.getTopArtists(20).then((topArtists) => {
            this.getTopTracksForAllArtists(topArtists).then((topTracks) => {
                this.setState({
                    topArtists: topArtists,
                    topArtistsTracks: topTracks,
                    dataHasLoaded: true
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
                var similarArtists = response.artists.slice(0, limit)
                this.setState({
                    similarToSelectedArtist: similarArtists,
                    dataHasLoaded: true
                })
            })
    }

    isFollowingArtist = (artistId) => {
        this.props.spotifyWebApi.isFollowingArtists([artistId])
            .then((response) => {
                this.setState({
                    isFollowingSelectedArtist: response[0],
                    dataHasLoaded: true
                })
            })
    }

    followArtist = (artistId) => {
        this.setDataHasLoaded(false);
        this.props.spotifyWebApi.followArtists([artistId])
            .then(() => {
                this.setDataHasLoaded(true);
                this.isFollowingArtist(artistId);
            })
    }

    unfollowArtist = (artistId) => {
        this.setDataHasLoaded(false);
        this.props.spotifyWebApi.unfollowArtists([artistId])
            .then(() => {
                this.setDataHasLoaded(true);
                this.isFollowingArtist(artistId);
            })
    }

    setDataHasLoaded = (hasLoaded) => {
        this.setState({
            dataHasLoaded: hasLoaded
        })
    }

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


    updateTimeRange = (selectedTimeRange) => {
        console.log(selectedTimeRange);
        this.setState({
            timeRange: selectedTimeRange,
            dataHasLoaded: false
        })
        this.getAllData();
    }

    handleListClickEvent = (index) => {
        this.setState({
            selectedArtist: index,
            dataHasLoaded: false
        })
        this.getSimilarArtists(4, this.state.topArtists[index].id);
        this.isFollowingArtist(this.state.topArtists[index].id);
    }


    render() {
        if (!this.state.dataHasLoaded) { return <p>Loading data...</p> }
        return (
            <div className="TopArtists">
                <div className="header">Your Top Artists {this.getTimeRangeInString()}</div>
                <div className="mainContent">
                    <div className="resultsContainer">
                        {this.state.topArtists.map((result, index) => (
                            <li className="result" id={index} onClick={() => { this.handleListClickEvent(index) }} >
                                <div className="albumArtContainer">
                                    <img className="albumArt" src={result.images[0].url} alt="album art" />
                                    <div className="middleOfAlbumArt">
                                        <img alt="start/stop icon" className="startStop" onClick={() => { playOrPausePreview('artist-top-song-preview' + index) }} src="https://image.flaticon.com/icons/svg/27/27185.svg" />
                                    </div>
                                </div>
                                <p>{result.name}</p>
                                <audio ref="song" id={"artist-top-song-preview" + index}>
                                    <source src={this.state.topArtistsTracks[index].preview_url} type="audio/ogg" />
                                </audio>
                            </li>
                        ))}
                    </div>
                    <div className="detailsContainer">
                        <DropdownButton className="timeRangeDropdown" title="Change time range" id="action-button">
                            <Dropdown.Item onClick={() => { this.updateTimeRange("long_term") }}>All time top artists</Dropdown.Item>
                            <Dropdown.Item onClick={() => { this.updateTimeRange("medium_term") }}>Top artists for past 6 months</Dropdown.Item>
                            <Dropdown.Item onClick={() => { this.updateTimeRange("short_term") }}>Top artists for past month</Dropdown.Item>
                        </DropdownButton>
                        <div className="artistDetails">
                            <div>
                                <p> CHANGE THIS TO USE TABS BETWEEN GENRES/SIMILAR ARTISTS </p>
                                <h2>{this.state.topArtists[this.state.selectedArtist].name}</h2>
                                {this.state.isFollowingSelectedArtist &&
                                    <div>
                                        <p>You are one of {this.state.topArtists[this.state.selectedArtist].name}'s {this.state.topArtists[this.state.selectedArtist].followers.total} followers!</p>
                                    <div id="action-button" onClick={() => this.unfollowArtist(this.state.topArtists[this.state.selectedArtist].id)}> Unfollow :( </div>

                                </div>
                                }
                                {!this.state.isFollowingSelectedArtist &&
                                    <div>
                                        <p>{this.state.topArtists[this.state.selectedArtist].name} have {this.state.topArtists[this.state.selectedArtist].followers.total} followers. Follow now?</p>
                                        <div id="action-button" onClick={() => this.followArtist(this.state.topArtists[this.state.selectedArtist].id)}> Follow </div>
                                    </div>
                                }
                                <p>Genres:</p>
                                {this.state.topArtists[this.state.selectedArtist].genres.map((genre) => (
                                    <li>{genre}</li>
                                ))}
                                <br />
                                <p> Similar artists:</p>
                                {this.state.similarToSelectedArtist.map((similarArtist) => (
                                    <li>{similarArtist.name}</li>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default TopArtists;
