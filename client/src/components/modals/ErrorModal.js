import React, { Component } from 'react';
import './ErrorModal.css';

/** Responsible for rendering an error message modal dialog
 *  Requires a 'descriptionText' input from parent component
 * */
class ErrorModal extends Component {
    render() {
        return (
            <div id="errorModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p>Error!</p>
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

export default ErrorModal;
