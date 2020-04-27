import React, { Component } from 'react';
import { Pie } from "react-chartjs-2";


/**
 * Responsible for displaying the popularity of the selected artist
 * */
class TopArtistPopularity extends Component {
    constructor() {
        super();
        this.state = {
            showExplanation: true,
            pieData: {},
            pieOptions: {}
        }
    }

    hideMessage = () => {
        this.setState({
            showExplanation: false
        })
        this.populatePieChart();
    }


    populatePieChart = () => {
        var remaining = 100 - this.props.popularity
        this.setState({
            pieData: {
                labels: ["Popularity", ""],
                datasets: [{
                    data: [
                        this.props.popularity, 
                        remaining
                    ],
                    backgroundColor: [
                        "rgba(240, 135, 30,0.9)"
                    ],
                    hoverBackgroundColor: [
                        "rgba(240, 135, 30,0.6)"
                    ]
                }]
            },
            pieOptions: {
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltips: {
                    yLabel: "Test"
                },
                responsive: true
            }
        });
        
    }


    render() {
        if (this.state.showExplanation) {
            return (
                <div className="artistPopularity">
                    <div>
                        <p>
                            Artists' popularity is calculated from the popularity of all the artist's tracks and are given on a scale of 0 (unpopular) to 100 (popular).
                            The popularity of a track is calculated by algorithm and is based on the total number of plays the track has had and how recent those plays are.
                            Generally, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past.
                            Duplicate tracks (e.g. the same track from a single and an album) are rated independently.
                         </p>
                        <div className="genericButton" onClick={this.hideMessage}>Ok! Hide this message</div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="artistPopularity">
                    <p>Note that the popularity value may lag actual popularity by a few days: the value is not updated in real time.</p>
                    <div className="pieContainer">
                        <Pie data={this.state.pieData} options={this.state.pieOptions}/>
                    </div>
                </div>
            )
        }
    }
}

export default TopArtistPopularity;
