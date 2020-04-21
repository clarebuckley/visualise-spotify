import React, { Component } from 'react';
import TopArtistsList from './TopArtistsList'
import TopArtistDetails from './TopArtistDetails';
import './TopArtists.css';

//Set the amount of similar artists to be displayed (MAX=20)
const similarArtistsReturnLimit = 9;

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
            isFollowingArtist: false
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

    //Spotify API returns data for a given time range
    updateTimeRange = (selectedTimeRange) => {
        this.setState({
            timeRange: selectedTimeRange,
            dataHasLoaded: false
        })
        this.getAllData();
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


    render() {
        if (!this.state.dataHasLoaded) { return <p>Loading data...</p> }
        return (
            <div className="TopArtists">
                <div className="header">Your Top Artists {this.getTimeRangeInString()}</div>
                <div className="mainContent">
                    <TopArtistsList
                        topArtists={this.state.topArtists}
                        handleListClickEvent={this.handleListClickEvent}>
                    </TopArtistsList>
                    <TopArtistDetails
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
                    >
                    </TopArtistDetails>

                </div>

            </div>
        );
    }
}


export default TopArtists;
