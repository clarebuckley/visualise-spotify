import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

/**
 * Responsible for changing the timeframe for the displayed top tracks data
 * */
class TopTracksTimeframe extends Component {
  render() {
    if (this.props.isLoaded == true) {
      return (
        <DropdownButton className="dropdown" title={this.props.titleTimeframe} id="action-button">
        <Dropdown.Item onClick={() => { this.props.selectTimeframe("long_term") }}>All Time</Dropdown.Item>
        <Dropdown.Item onClick={() => { this.props.selectTimeframe("medium_term") }}>The Last 6 Months</Dropdown.Item>
        <Dropdown.Item onClick={() => { this.props.selectTimeframe("short_term") }}>The Last Month</Dropdown.Item>
        </DropdownButton>
      );
    } else {
      return <p>Loading...</p>
    }

  }
}

export default TopTracksTimeframe;
