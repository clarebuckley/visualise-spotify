import React, { Component } from 'react';
import './TopArtists.css';

class TopArtists extends Component {
    constructor() {
        super();
        this.state = {
            topArtists: [],
            topArtistsTracks: [],
            promiseIsResolved: false
        }
    }

    componentDidMount() {
        //Need to get top artists before finding the top track for each artist
        this.getTopArtists(10).then((artists) => {
            this.getTopTracksForAllArtists(artists).then((topTracks) => {
                this.setState({
                    topArtistsTracks: topTracks
                }, () => {
                    console.log("State after both requests have been made:");
                    console.log(this.state);
                    this.setState({ promiseIsResolved: true })
                });
            })


        })
    }

    //Get x top artists for this user
    getTopArtists = (numOfTopArtists) => {
        return new Promise(resolve => {
            this.props.spotifyWebApi.getMyTopArtists({ limit: numOfTopArtists })
                .then((response) => {
                    this.setState({
                        topArtists: response.items
                    })
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
                //        this.setState({
                //            topArtistsTracks: topTracks
                //        })
                //        console.log("Top tracks fetched from api:");
                //        console.log(topTracks);

            })
        })
        
    }

    //Get the top track for a single artist
    getSingleArtistTopTrack = async (artistId) => {
        return new Promise(resolve => {
            //need to get rid of "GB" string TODO
            this.props.spotifyWebApi.getArtistTopTracks(artistId, "GB", { limit: 1 })
                .then((response) => {
                    return resolve(response.tracks[0]);
                }).catch((err) => {
                    console.error(err);
                })
        })

    }


    render() {
        if (!this.state.promiseIsResolved) { return null }
        return (
            <div className="TopArtists">
                <div className="header">Your top artists</div>

                    <div className="resultsContainer">
                        {this.state.topArtists.map((result, index) => (
                            <li className="result">
                                <img src={result.images[0].url} height="80px" alt="album art" />
                            <p>{result.name}</p>
                            <p>{this.state.topArtistsTracks[0].name}</p>
                            </li>
                    ))}
                    </div>


            </div>
        );

    }
}

export default TopArtists;
