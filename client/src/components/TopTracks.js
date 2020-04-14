import React, { Component } from 'react';


class TopTracks extends Component {
    constructor() {
        super();
        this.state = {
            topTracks: {
                name: 'Not Checked',
                artists: 'Dunno',
            }
        }

    }



    getTopTracks(spotifyWebApi) {
        spotifyWebApi.getMyTopTracks().then((response) => {
            this.setState({
                topTracks: {
                    name: response.items.name,
                    artists: 'Dunno Still',
                }
            })
        })
    }

    render() {
        return (
            <div className="App">
                <div>Top Song: {this.state.topTracks.name} </div>
                <div>By: {this.state.topTracks.artists} </div>
                <div>
                    <img src={this.state.topTracks.image} style={{ width: 100 }} />
                </div>
                <button onClick={() => this.getTopTracks(this.props.spotifyWebApi)}>
                    Check Top Song
          </button>
            </div>
        );

    }
}

export default TopTracks;
