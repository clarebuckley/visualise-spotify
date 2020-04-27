import React, { Component } from 'react';
import './Welcome.css';

class Welcome extends Component {
    render() {
        return (
            <div className="Welcome">
                <p> Hi  {this.props.userDetails.display_name.split(' ')[0]}! </p>
                <p> This web app will tell you all you need to know about your music taste. </p>
                <p> For any bugs or suggestions, please contact <a href="https://github.com/clarebuckley">Clare</a> or <a href="https://github.com/thavi97">Thavi</a>, or raise an issue on <a href="https://github.com/clarebuckley/visualise-spotify">github</a> :)</p>
            </div>
        );
    }
}

export default Welcome;
