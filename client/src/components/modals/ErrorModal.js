import React, { Component } from 'react';
import './ErrorModal.css';

/** Responsible for rendering an error message modal dialog
 *  Requires a 'descriptionText' input from parent component
 * */
class ErrorModal extends Component {
    render() {
        return (
            <div id="errorModal" class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <p>Error!</p>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body">
                            <p class="popup-text">{this.props.descriptionText}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ErrorModal;
