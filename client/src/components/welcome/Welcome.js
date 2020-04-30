import React, { Component } from 'react';
import './Welcome.css';

class Welcome extends Component {
    render() {
        return (
            <div className="Welcome">
                <p> Hi  {this.props.userDetails.display_name.split(' ')[0]}! </p>
                <p> This web app will tell you all you need to know about your music taste. </p>
                <p> For any bugs or suggestions, please contact <a href="https://github.com/clarebuckley">Clare</a> or <a href="https://github.com/thavi97">Thavi</a>, or raise an issue on <a href="https://github.com/clarebuckley/visualise-spotify">github</a> :)</p>
                <p> On this app you can: </p>
                <ul>
                    <li>See and preview your top tracks</li>
                    <li>See how popular your top tracks are</li>
                    <li>Make playlists from your top tracks</li>
                    <li>See and preview your top artists</li>
                    <li>See how popular your top artists are</li>
                    <li>See the genre of your top artists</li>
                    <li>Find similar artists to your top artists</li>
                    <li>Make playlists from your top artists</li>
                    <li>Make playlists of similar artists to one of your top artists</li>
                </ul>
            </div>
        );
    }
}

export default Welcome;
