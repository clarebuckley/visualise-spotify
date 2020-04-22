import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

/**
 * Responsible for changing the time range for the displayed top artist data
 * */
class TopArtistsTimeRange extends Component {
    render() {
        return (
            <DropdownButton className="timeRangeDropdown" title="Change time range" id="action-button">
                <Dropdown.Item onClick={() => { this.props.setTimeRange("long_term") }}>All time top artists</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.props.setTimeRange("medium_term") }}>Top artists for past 6 months</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.props.setTimeRange("short_term") }}>Top artists for past month</Dropdown.Item>
            </DropdownButton>
        );
    }
}

export default TopArtistsTimeRange;