import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

/**
 * Responsible for changing the time range for the displayed top artist data
 * */
class TopTracksNumberOfSongs extends Component {
    render() {
      var numberOfSongs = `${this.props.numberOfSongs} Songs`
        return (
            <DropdownButton className="dropdown" title={numberOfSongs} id="action-button">
                <Dropdown.Item onClick={() => { this.props.selectNumberOfSongs(5); }}>5</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.props.selectNumberOfSongs(10); }}>10</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.props.selectNumberOfSongs(20); }}>20</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.props.selectNumberOfSongs(30); }}>30</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.props.selectNumberOfSongs(40); }}>40</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.props.selectNumberOfSongs(50); }}>50</Dropdown.Item>
            </DropdownButton>
        );
    }
}

export default TopTracksNumberOfSongs;
