import React, { Component } from 'react';

/**
 * Responsible for displaying the list of the user's top tracks.
 * */
class TopTracksSongList extends Component {
    render() {
        return (
          <div className="list-group col-lg-4 top-song-list">
            {this.props.topTracks.map((track, index) => (
              <button key={track.id} id={index} onClick={() => {this.props.selectSong(track);}} className={this.props.focusedSong === index ? 'song-card-selected' : 'song-card'}>
                {<img className="img-responsive float-left margin-right" src={track.album.images[0].url} style={{ width: 50 }} alt=""/>}
                <p className="song-card-text vertical-center float-left col-sm-9">{`${this.props.topTracks.indexOf(track)+1}. ${track.name}`}</p>
              </button>
            ))}
          </div>
        );
    }
}

export default TopTracksSongList;
