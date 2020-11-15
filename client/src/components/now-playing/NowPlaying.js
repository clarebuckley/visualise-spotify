import React, { Component } from 'react';
import './NowPlaying.css';

class NowPlaying extends Component {
    constructor() {
        super();
        this.state = {
            nowPlaying: {
                name: 'Not Checked',
                artists: null,
                image: null,
            },
            showNowPlaying: false,
            hideWholeBanner: true, //change to false when spotify api is in stable state
            spotifyIsPlaying: true,
        };
    }

    getNowPlaying = (spotifyWebApi) => {
        spotifyWebApi.getMyCurrentPlaybackState().then((response) => {
            console.log(response);
            if (response.item == null) {
                this.setState({
                    spotifyIsPlaying: false,
                });
            } else {
                this.setState({
                    nowPlaying: {
                        name: response.item.name,
                        artists: response.item.artists[0].name,
                        image: response.item.album.images[0].url,
                    },
                    showNowPlaying: true,
                });
            }
        });
    };

    skipToNext = () => {
        this.props.spotifyWebApi.skipToNext().then((response) => {
            console.log(response);
        });
    };

    hideComponent = () => {
        this.setState({
            showNowPlaying: false,
            hideWholeBanner: true,
        });
    };

    render() {
        if (this.state.hideWholeBanner) {
            return null;
        }
        if (!this.state.spotifyIsPlaying) {
            return <p> something</p>;
        }
        if (!this.state.showNowPlaying) {
            return (
                <div className="NowPlaying row justify-content-md-center">
                    <div
                        className="genericButton"
                        onClick={() =>
                            this.getNowPlaying(this.props.spotifyWebApi)
                        }
                    >
                        Show media player
                    </div>
                    <div className="genericButton" onClick={this.hideComponent}>
                        Hide
                    </div>
                </div>
            );
        } else {
            return (
                <div className="NowPlaying">
                    <div>Now Playing: {this.state.nowPlaying.name} </div>
                    <div>
                        <img
                            src={this.state.nowPlaying.image}
                            alt=""
                            style={{ width: 100 }}
                        />
                    </div>
                    <div onClick={() => this.skipToNext()}>Skip</div>
                </div>
            );
        }
    }
}

export default NowPlaying;
