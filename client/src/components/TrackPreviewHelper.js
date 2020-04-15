export function playOrPausePreview(songPreviewId) {
    var song_preview = document.getElementById(songPreviewId);
    song_preview.volume = 0.1;
    if (song_preview.paused) {
        song_preview.play();
    } else {
        song_preview.pause();
    }
}

export function selectSong(track_index) {
    this.setState({
        focusedSong: track_index,
    })
}

export function autoplaySong() {
    var song_preview = this.ref.song;
    song_preview.volume = 0.1;
    song_preview.play();
    console.log('hi');
}

