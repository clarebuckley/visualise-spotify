import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

/**
 * Responsible for changing the number of top tracks to be displayed
 * */
class TopTracksNumberOfSongs extends Component {
    render() {
        return (
            <DropdownButton className="dropdown" title={this.props.numberOfSongs} id="action-button">
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
