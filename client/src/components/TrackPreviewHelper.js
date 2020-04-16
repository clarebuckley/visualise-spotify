export function playOrPausePreview(songPreviewId) {
    var song_preview = document.getElementById(songPreviewId);
    var audioElements = document.getElementsByTagName("audio");

    song_preview.volume = 0.3;
    if (song_preview.paused) {
        //Stop any other audio elements in the app from playing
        for (let audio of audioElements) {
            audio.pause();
        }
        song_preview.play();
    } else {
        song_preview.pause();
    }
}



export function autoplaySong() {
    var song_preview = this.ref.song;
    song_preview.volume = 0.1;
    song_preview.play();
    console.log('hi');
}
