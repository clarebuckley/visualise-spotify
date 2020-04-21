import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

/**
 * Responsible for changing the time range for the displayed top artist data
 * */
class TopArtistsTimeRange extends Component {
    //Spotify API returns data for a given time range
    updateTimeRange = (selectedTimeRange) => {
        this.setState({
            timeRange: selectedTimeRange,
            dataHasLoaded: false
        })
        this.props.getAllData();
    }

    render() {
        return (
            <DropdownButton className="timeRangeDropdown" title="Change time range" id="action-button">
                <Dropdown.Item onClick={() => { this.updateTimeRange("long_term") }}>All time top artists</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.updateTimeRange("medium_term") }}>Top artists for past 6 months</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.updateTimeRange("short_term") }}>Top artists for past month</Dropdown.Item>
            </DropdownButton>
        );
    }
}

export default TopArtistsTimeRange;