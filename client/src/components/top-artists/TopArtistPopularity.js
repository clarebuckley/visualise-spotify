import React, { Component } from 'react';
import { Pie } from "react-chartjs-2";


/**
 * Responsible for displaying the popularity of the selected artist
 * */
class TopArtistPopularity extends Component {
    constructor() {
        super();
        this.state = {
            popularityChart: {
                datasets: [
                    {
                        data: [],
                        backgroundColor: ["#0074D9"],
                    },
                ],
            }
        }
    }




    render() {
        return (
            <div className="artistPopularity">
                <p>Note that the popularity value may lag actual popularity by a few days: the value is not updated in real time.</p>

            </div>
        )
    }
}

export default TopArtistPopularity;
