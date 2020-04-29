import React, { Component } from 'react';
import { getCurrentDate } from '../../helpers/DateHelper.js';
import { uploadPlaylistImage } from '../../helpers/PlaylistHelper.js';

/**
 * Responsible for telling the user the number of songs within a given timeframe.
 * Also responsible for creating a playlist of the songs.
 * */
class TopTracksHeader extends Component {

  /**
   * Creates a new Spotify playlist of top tracks for the user given their parameters
   */
  createNewPlaylist = (spotifyWebApi) =>{
    var songUriList = [];
    var playlistName = `My Top ${this.props.numberOfSongs} Songs of ${this.props.titleTimeframe}`;
    var playlistDescription = `These are your Top ${this.props.numberOfSongs} Songs of ${this.props.titleTimeframe} as of ${getCurrentDate()}`;
    spotifyWebApi.createPlaylist(this.props.userId, {name:playlistName, description:playlistDescription}).then((response)=>{
      for (var i = 0; i < this.props.numberOfSongs; i++) {
        songUriList.push(this.props.topTracks[i].uri)
      }
      spotifyWebApi.addTracksToPlaylist(response.id, songUriList)
      uploadPlaylistImage(spotifyWebApi, response.id, "/top-tracks-playlist-cover.jpg")
    })
  }

  render() {
    return (
      <div className="header">
        <p>Your Top {this.props.numberOfSongs} Songs of {this.props.titleTimeframe}</p>
        <button type="button" className="btn btn-success" onClick={() => { this.createNewPlaylist(this.props.spotifyWebApi);}} data-toggle="modal" data-target="#myModal">
          Add These Songs To Playlist
        </button>
        <div id="myModal" class="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              <div className="modal-body">
                <p className="popup-text">A playlist with your Top {this.props.numberOfSongs} songs of {this.props.titleTimeframe} has been created! Check your Spotify!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopTracksHeader;
