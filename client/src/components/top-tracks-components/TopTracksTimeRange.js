import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

/**
 * Responsible for changing the time range for the displayed top artist data
 * */
class TopTracksTimeRange extends Component {
    render() {
        return (
            <DropdownButton className="dropdown" title={this.props.titleTimeframe} id="action-button">
                <Dropdown.Item onClick={() => { this.props.selectTimeframe("long_term") }}>All Time</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.props.selectTimeframe("medium_term") }}>The Last 6 Months</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.props.selectTimeframe("short_term") }}>The Last Month</Dropdown.Item>
            </DropdownButton>
        );
    }
}

export default TopTracksTimeRange;
