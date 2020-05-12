import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { calculateAveragePopularity, generateTextForAveragePopularity } from '../../helpers/PopularityChartHelper.js';

/**
 * Responsible for displaying the popularity of the selected artist
 * */
class TopArtistPopularity extends Component {

    // Clicking on a bar will take the user to view that artist
    handleClick = (mouseEvent, chartElement) => {
       let element = chartElement[0];
        this.props.handleListClickEvent(element._index);
    }
    
    render() {
        if (!this.props) { return "Loading..." } else {
            return (
                <div className="artistPopularity">
                    <div className="margin-bottom col-lg-10 offset-lg-1">
                        <Bar
                            data={this.props.popularityChartData}
                            options={{
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                            fontColor: 'white'
                                        },
                                    }],
                                    xAxes: [{
                                        display: false,
                                        ticks: {
                                            fontColor: 'white'
                                        },
                                    }]
                                },
                                title: {
                                    display: true,
                                    text: 'Popularity of Your Top Artists',
                                    fontSize: 16,
                                    fontColor: '#ffffff'
                                },
                                legend: {
                                    display: false,
                                    position: 'right',
                                    labels: {
                                        fontColor: 'white'
                                    }
                                },
                                tooltips: {
                                    callbacks: {
                                        label: function (tooltipItem) {
                                            return tooltipItem.yLabel;
                                        }
                                    }
                                },
                                events: ['click'],
                                onClick: this.handleClick
                            }}
                        />
                    </div>
                    <div className="col-lg-12 popularity-text-container">
                        <div>
                            The average popularity score for these artists is {calculateAveragePopularity(this.props.popularityChartData.datasets[0].data, this.props.numOfArtists)}/100!
                        </div>
                        <div>
                            {generateTextForAveragePopularity(calculateAveragePopularity(this.props.popularityChartData.datasets[0].data, this.props.numOfArtists))}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default TopArtistPopularity;
