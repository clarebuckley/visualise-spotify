import React, { Component } from 'react';

/**
 * Responsible for rendering the list of top artists for this user
 * */
class TopArtistsList extends Component {

    //Need to load additional data for a given artist
    handleListClickEvent = (index) => {
        this.props.handleListClickEvent(index)
    }

    render() {
        return (
            <div className="resultsContainer">
                {this.props.topArtists.map((result, index) => (
                    <li id={index} onClick={() => { this.handleListClickEvent(index) }} className={this.props.selectedArtist === index ? 'selected' : 'result'}>
                        <div className="albumArtContainer">
                            <img className="albumArt" src={result.images[0].url} alt="album art" />
                        </div>
                        <p>{result.name}</p>
                    </li>
                ))}
            </div>
        );
    }
}

export default TopArtistsList;
