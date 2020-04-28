import React, { Component } from 'react';
import { getCurrentDate } from '../../helpers/DateHelper.js';

/**
 * Responsible for telling the user the number of songs within a given timframe.
 * Also responsible for creating a playlist of the songs.
 * */
class TopTracksHeader extends Component {

  createNewPlaylist = (spotifyWebApi) =>{
    var songUriList = [];
    var playlistName = `My Top ${this.props.numberOfSongs} Songs of ${this.props.titleTimeframe}`;
    var playlistDescription = `These are your Top ${this.props.numberOfSongs} Songs of ${this.props.titleTimeframe} as of ${getCurrentDate()}`;
    spotifyWebApi.createPlaylist(this.props.userId, {name:playlistName, description:playlistDescription}).then((response)=>{
      for (var i = 0; i < this.props.numberOfSongs; i++) {
        songUriList.push(this.props.topTracks[i].uri)
      }
      spotifyWebApi.addTracksToPlaylist(response.id, songUriList)
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
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              <div class="modal-body">
                <p class="popup-text">A playlist with your Top {this.props.numberOfSongs} songs of {this.props.titleTimeframe} has been created! Check your Spotify!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopTracksHeader;
