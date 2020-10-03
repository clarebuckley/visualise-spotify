import React, { Component } from 'react';
import './SuccessModal.css';

/** Responsible for rendering a success message modal dialog
 *  Requires a 'descriptionText' input from parent component
 * */
class SuccessModal extends Component {
    render() {
        return (
            <div id="successModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p>Success!</p>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <p className="popup-text">
                                {this.props.descriptionText}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SuccessModal;
