import React, { Component } from 'react';

/** Responsible for rendering a modal dialog to select the number of songs by each
 *  artist to be included in the playlist
 * */
class ErrorPage extends Component {
    render() {
        return (
            <div id="ErrorPage">
                <p>Loading data...</p>
                <p>If data hasn't loaded after a minute or so, please refresh the page, or try logging out and in again.</p><br/>
                <div>
                <a className="logoutLink" onClick={() => this.props.logOut} >
                    Log Out
                </a>
                    </div><br/>
                <p>If you have already done the steps above, there may be an issue with getting the data.</p>
                <p>Please let Thavi or Clare know and hopefully we'll be up and running again soon :)</p>
            </div>
        );
    }
}

export default ErrorPage;
