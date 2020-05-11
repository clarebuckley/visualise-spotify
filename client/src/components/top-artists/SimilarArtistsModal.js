import React, { Component } from 'react';

/** Responsible for rendering a modal dialog to select the number of songs by each
 *  artist and how many similar artists to be included in the playlist
 * */
class SimilarArtistsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numOfSongs: 1,
            numOfArtists: 3
        }
    }

    handleChangeNumSongs = (event) => {
        this.setState({
            numOfSongs: event.target.value
        })
    }

    handleChangeNumArtists = (event) => {
        this.setState({
            numOfArtists: event.target.value
        })
    }

    render() {
        return (
            <div >
                <div id="similarArtistsModal" className="modal fade" role="dialog" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <p>Please select</p>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <p>How many similar artists should be included in the playlist?</p>
                                    <select value={this.state.numOfArtists} onChange={this.handleChangeNumArtists}>
                                        <option value="3">3</option>
                                        <option value="6">6</option>
                                        <option value="9">9</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                    </select>
                                </div>
                                <div>
                                    <p>How many songs by each artist should be included in the playlist?</p>
                                    <select value={this.state.numOfSongs} onChange={this.handleChangeNumSongs}>
                                        <option value="1">1</option>
                                        <option value="3">3</option>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => this.props.createNewPlaylist(this.state.numOfSongs, this.state.numOfArtists)}>Create playlist</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default SimilarArtistsModal;
