import React, { Component } from 'react';
import './NowPlaying.css';

class NowPlaying extends Component {
    constructor() {
        super();
        this.state = {
            nowPlaying: {
                name: 'Not Checked',
                artists: null,
                image: null
            },
            showNowPlaying: false
        }
    }


    getNowPlaying = (spotifyWebApi) => {
        spotifyWebApi.getMyCurrentPlaybackState().then((response) => {
            console.log(response);
            var nowPlaying;
            if (response.item == null) {
                nowPlaying = {
                    name: "Not currently listening to anything",
                    artists: null,
                    image: null
                }
            } else {
                nowPlaying = {
                    name: response.item.name,
                    artists: response.item.artists[0].name,
                    image: response.item.album.images[0].url
                }
            }
            this.setState({
                nowPlaying,
                showNowPlaying: true
            })
        })
    }

    hideComponent = () => {
        console.log("hit");
        this.setState({
            showNowPlaying: false,
            test: true
        })
        this.render();
    }

    render() {
        if (!this.state.showNowPlaying) {
            return (
                <div className="NowPlaying row justify-content-md-center">
                    <div className="nowPlayingButton" onClick={() => this.getNowPlaying(this.props.spotifyWebApi)}>Show media player</div>
                    <div className="nowPlayingButton" onClick={this.hideComponent}>Hide</div>
                </div>
            )
        } else if(this.state.showNowPlaying) {
            return (
                <div className="NowPlaying">
                    <div>Now Playing: {this.state.nowPlaying.name} </div>
                    <div>
                        <img src={this.state.nowPlaying.image} alt="" style={{ width: 100 }} />
                    </div>

                </div>
            );
        }
    }
}

export default NowPlaying;
