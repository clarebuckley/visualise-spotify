import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TopTracks from './components/TopTracks';
import NowPlaying from './components/NowPlaying';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(<App/>,document.getElementById('root'));
ReactDOM.render(<TopTracks/>,document.getElementById('top-tracks'));
ReactDOM.render(<NowPlaying/>,document.getElementById('now-playing'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
