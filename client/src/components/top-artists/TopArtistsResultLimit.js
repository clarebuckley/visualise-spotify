import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

/**
 * Responsible for changing the amount of results returned for the displayed top artist data
 * */
class TopArtistsResultLimit extends Component {
    render() {
        return (
            <DropdownButton className="dropdown" title="Change number of results" id="action-button">
                <Dropdown.Item onClick={() => { this.props.setResultLimit(5) }}>5</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.props.setResultLimit(10) }}>10</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.props.setResultLimit(20) }}>20</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.props.setResultLimit(30) }}>30</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.props.setResultLimit(40) }}>40</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.props.setResultLimit(50) }}>50</Dropdown.Item>
            </DropdownButton>
        );
    }
}

export default TopArtistsResultLimit;