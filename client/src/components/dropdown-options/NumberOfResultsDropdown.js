import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

/**
 * Responsible for changing the number of results to be displayed
 * */
class NumberOfResultsDropdown extends Component {
    render() {
        return (
            <DropdownButton
                className="dropdown"
                title={this.props.numberOfResults}
                id="action-button"
            >
                <Dropdown.Item
                    onClick={() => {
                        this.props.selectNumberOfResults(5);
                    }}
                >
                    5
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => {
                        this.props.selectNumberOfResults(10);
                    }}
                >
                    10
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => {
                        this.props.selectNumberOfResults(20);
                    }}
                >
                    20
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => {
                        this.props.selectNumberOfResults(30);
                    }}
                >
                    30
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => {
                        this.props.selectNumberOfResults(40);
                    }}
                >
                    40
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => {
                        this.props.selectNumberOfResults(50);
                    }}
                >
                    50
                </Dropdown.Item>
            </DropdownButton>
        );
    }
}

export default NumberOfResultsDropdown;
