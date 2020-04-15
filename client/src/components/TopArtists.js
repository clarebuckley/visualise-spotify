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
                console.log(response.items);
                this.setState({
                    topArtists: response.items
                })
            })
    }
  

    render() {
        
            return (
                <div className="TopArtists">
                    <div className="header">Your top artists</div>
                    <div className="resultsContainer">
                        {this.state.topArtists.map((result, index) => (
                            <li className="result">
                                <img src={result.images[2].url} height="80px" alt="album art" /> 
                                <p>{result.name}</p>
                            </li>
                        ))}
                    </div>
                </div>
            );
        

    }
}

export default TopArtists;
