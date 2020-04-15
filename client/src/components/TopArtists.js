import React, { Component } from 'react';
import './TopArtists.css';

class TopArtists extends Component {
    constructor() {
        super();
        this.state = {
            topArtists: []
        }
    }

    componentDidMount() {
        this.getTopArtists();
    }

    getTopArtists = () => {
        this.props.spotifyWebApi.getMyTopArtists({ limit: 10 })
            .then((response) => {
                var artists = response.items;
                this.getAllArtistsTopTracks(artists)
                    .then((updatedArtists) => {
                        this.setState({
                            topArtists: updatedArtists
                        })
                        console.log(this.state.topArtists[0]);
                    })
            })
            .catch((err) => {
                console.error(err);
            })
    }

    getAllArtistsTopTracks = (artists) => {
        return new Promise(resolve => {
            for (let artist of artists) {
                this.getSingleArtistTopTrack(artist.id)
                    .then((topTrack) => {
                        artist.topTrack = topTrack;
                    })
            }
            return resolve(artists);
        })
    }



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
        return (
            <div className="TopArtists">
                <div className="header">Your top artists</div>
                {this.state && this.state.topArtists &&
                    <div className="resultsContainer">
                        {this.state.topArtists.map((result, index) => (
                            <li className="result">
                                <img src={result.images[2].url} height="80px" alt="album art" />
                                <p>{result.name}</p>
                              
                            </li>
                        ))}
                    </div>
                }
                
            </div>
        );
    }
}

export default TopArtists;
