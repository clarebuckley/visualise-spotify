import React, { Component } from 'react';
import './SuccessModal.css';

/** Responsible for rendering a success message modal dialog
 *  Requires a 'descriptionText' input from parent component
 * */
class SuccessModal extends Component {
    render() {
        return (
            <div id="successModal" class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <p>Success!</p>
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

export default SuccessModal;
