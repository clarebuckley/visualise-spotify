import React, { Component } from 'react';

/** Responsible for rendering a modal dialog to select the number of songs by each
 *  artist to be included in the playlist
 * */
class SelectNumSongsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numOfSongs: 1
        }
    }

    handleChange = (event) => {
        this.setState({
            numOfSongs: event.target.value
        })
    }

    render() {
        return (
            <div id="selectNumSongsModal" class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <p>Please select</p>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body">
                            <p>{this.props.descriptionText}</p>
                            <select value={this.state.numOfSongs} onChange={this.handleChange}>
                                <option value="1">1</option>
                                <option value="3">3</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <div class="modal-footer">
                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => this.props.createNewPlaylist(this.state.numOfSongs) }>Create playlist</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectNumSongsModal;
