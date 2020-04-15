import React, { Component } from 'react';

class NowPlaying extends Component {
    constructor() {
        super();
        this.state = {
            nowPlaying: {
                name: 'Not Checked',
                artists: 'Dunno',
                image: ''
            }
        }
    }


    getNowPlaying(spotifyWebApi) {
        spotifyWebApi.getMyCurrentPlaybackState().then((response) => {
            this.setState({
                nowPlaying: {
                    name: response.item.name,
                    artists: response.item.artists[0].name,
                    image: response.item.album.images[0].url
                }
            })
        })
    }

    render() {
        return (
            <div className="App">
                <div>Now Playing: {this.state.nowPlaying.name} </div>
                <div>By: {this.state.nowPlaying.artists} </div>
                <div>
                    <img src={this.state.nowPlaying.image} alt="" style={{ width: 100 }} />
                </div>
                <button onClick={() => this.getNowPlaying(this.props.spotifyWebApi)}>
                    Check Now Playing
          </button>
            </div>
        );
    }
}

export default NowPlaying;
