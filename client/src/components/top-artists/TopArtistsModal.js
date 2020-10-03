import React, { Component } from 'react';

/** Responsible for rendering a modal dialog to select the number of songs by each
 *  artist to be included in the playlist
 * */
class TopArtistsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numOfSongs: 1,
        };
    }

    handleChangeNumSongs = (event) => {
        this.setState({
            numOfSongs: event.target.value,
        });
    };

    render() {
        return (
            <div>
                <div id="topArtistsModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <p>Please select</p>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <p>
                                        How many songs by each artist should be
                                        included in the playlist?
                                    </p>
                                    <select
                                        value={this.state.numOfSongs}
                                        onChange={this.handleChangeNumSongs}
                                    >
                                        <option value="1">1</option>
                                        <option value="3">3</option>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    data-dismiss="modal"
                                    onClick={() =>
                                        this.props.createNewPlaylist(
                                            this.state.numOfSongs
                                        )
                                    }
                                >
                                    Create playlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TopArtistsModal;
