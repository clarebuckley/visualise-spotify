import React, { Component } from 'react';

/**
 * Responsible for displaying the list of the user's top tracks.
 * */
class TopTracksSongList extends Component {
    render() {
        return (
          <div className="list-group col-lg-4 top-song-list margin-top">
            {this.props.topTracks.map((track) => (
              <button onClick={() => {this.props.selectSong(track);}} className="song-card" key={track.id}>
                {<img className="img-responsive float-left" src={track.album.images[0].url} style={{ width: 50 }} alt=""/>}
                <p className="song-card-text vertical-center">{track.name}</p>
              </button>
            ))}
          </div>
        );
    }
}

export default TopTracksSongList;
