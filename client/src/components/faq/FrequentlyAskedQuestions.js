import React, { Component } from 'react';
import './FrequentlyAskedQuestions.css';

class FrequentlyAskedQuestions extends Component {
  render(){
    return (
      <div className="App">
        <br/>
        <div>
          <h2>What does Artist Popularity mean?</h2>
          <p>
            Artist popularity is calculated from the popularity of all the artist's tracks and are given on a scale of 0 (unpopular) to 100 (popular).
            The popularity of a track is calculated by algorithm and is based on the total number of plays the track has had and how recent those plays are.
            Generally, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past.
            Duplicate tracks (e.g. the same track from a single and an album) are rated independently.
          </p>
          <b>Note that the popularity value may lag actual popularity by a few days: the value is not updated in real time.</b>
        </div>
        <br/>
        <div>
          <h2>What does Song Popularity mean?</h2>
          <p>
            The popularity of a track is a value between 0 and 100, with 100 being the most popular.
            The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.
            Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past.
            Duplicate tracks (e.g. the same track from a single and an album) are rated independently.
            Artist and album popularity is derived mathematically from track popularity.
          </p>
          <b>Note that the popularity value may lag actual popularity by a few days: the value is not updated in real time.</b>
        </div>
        <br/>
        <div>
          <h2>Can I report a bug/issue?</h2>
          <p>
            Yes! Please send any bugs to <a href="https://github.com/clarebuckley">Clare</a> or <a href="https://github.com/thavi97">Thavi</a>,
            or raise an issue on <a href="https://github.com/clarebuckley/visualise-spotify">github</a>.
          </p>
        </div>
      </div>
    );
  }
}

export default FrequentlyAskedQuestions;
