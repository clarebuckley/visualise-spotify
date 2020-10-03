import React, { Component } from 'react';

/**
 * Responsible for rendering the list of top artists for this user
 * */
class TopArtistsList extends Component {
    //Need to load additional data for a given artist
    handleListClickEvent = (index) => {
        this.props.handleListClickEvent(index);
    };

    render() {
        return (
            <ol className="list-group col-lg-4 topArtistList">
                {this.props.topArtists.map((result, index) => (
                    <li
                        id={index}
                        key={result.id}
                        onClick={() => {
                            this.handleListClickEvent(index);
                        }}
                        className={
                            this.props.selectedArtist === index
                                ? 'selected'
                                : 'result'
                        }
                    >
                        <img
                            className="albumArt"
                            src={result.images[0].url}
                            alt="album art"
                        />
                        <div className="textContainer">
                            <p className="top-artist-text">
                                {index + 1}. {result.name}
                            </p>
                        </div>
                    </li>
                ))}
            </ol>
        );
    }
}

export default TopArtistsList;
