import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import TopArtistPopularity from './TopArtistPopularity';
import TopArtistSimilarArtists from './TopArtistSimilarArtists';
import { playOrPausePreview } from '../../helpers/TrackPreviewHelper.js';

/**
 * Responsible for displaying the details for the currently selected artist
 * */
class TopArtistDetails extends Component {
    constructor() {
        super();
        this.state = {
            dataHasLoaded: false
        }
    }

    //Helper function to set whether the data has been loaded
    setDataHasLoaded = (hasLoaded) => {
        this.setState({
            dataHasLoaded: hasLoaded
        })
    }

    //Action to make the user follow a given artist
    followArtist = (artistId) => {
        this.setDataHasLoaded(false);
        this.props.spotifyWebApi.followArtists([artistId])
            .then(() => {
                this.setDataHasLoaded(true);
                this.props.checkFollowingArtist(artistId);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    //Action to make the user unfollow a given artist
    unfollowArtist = (artistId) => {
        this.setDataHasLoaded(false);
        this.props.spotifyWebApi.unfollowArtists([artistId])
            .then(() => {
                this.setDataHasLoaded(true);
                this.props.checkFollowingArtist(artistId);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    render() {
        if (!this.props) {
            return "Loading...";

            }
        return (
            <div className="artistDetails col-lg-8">
                <div className="mainAlbumContainer">
                    <img className="mainAlbumArt" src={this.props.artistImage} alt="album art" />
                    <div className="startStopContainer">
                        <img alt="start/stop icon" className="startStop" onClick={() => { playOrPausePreview('artist-top-song-preview' + this.state.selectedArtist) }} src="https://image.flaticon.com/icons/svg/27/27185.svg" />
                    </div>
                </div>
                <div>
                    <h2>{this.props.artistName}</h2>
                    <p>Click the album art to hear a preview.</p>
                    {this.props.isFollowingArtist &&
                        <div>
                            <p>You are one of {this.props.artistName}'s {this.props.followers} followers!</p>
                            <div id="action-button" onClick={() => this.unfollowArtist(this.props.artistId)}> Unfollow :( </div>
                        </div>
                    }
                    {!this.props.isFollowingArtist &&
                        <div>
                            <p>{this.props.artistName} have {this.props.followers} followers. Follow now?</p>
                            <div id="action-button" onClick={() => this.followArtist(this.props.artistId)}> Follow </div>
                        </div>
                    }
                </div>
                <Tabs defaultActiveKey="popularity" id="arist-details-tabs" className="aristDetailsTabs">
                    <Tab eventKey="similarArtists" title="Similar Artists" className="artistTabContent">
                        <TopArtistSimilarArtists
                            userId={this.props.userId}
                            spotifyWebApi={this.props.spotifyWebApi}
                            mainArtist={this.props.artistName} 
                            getTimeRangeInString={this.props.getTimeRangeInString}
                            similarArtists={this.props.similarArtists} />
                    </Tab>
                    <Tab eventKey="popularity" title="Artist Popularity" className="artistTabContent">
                        <TopArtistPopularity
                            popularityChartData={this.props.popularityChartData}
                            numOfArtists={this.props.numOfArtists}
                            handleListClickEvent={this.props.handleListClickEvent}
                        />
                    </Tab>
                    <Tab eventKey="genres" title="Genres" className="artistTabContent">
                        {this.props.genres.map((genre, index) => (
                            <li key={index} className="artistGenre">{genre}</li>
                        ))}
                    </Tab>
                </Tabs>

                <audio ref="song" id={"artist-top-song-preview" + this.state.selectedArtist}>
                    <source src={this.props.previewUrl} type="audio/ogg" />
                </audio>
            </div>
        );
    }
}

export default TopArtistDetails;
