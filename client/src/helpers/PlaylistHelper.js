import { toDataURL } from './Base64ImageHelper.js';

//Uploads a custom cover image to the given playlist
export function uploadPlaylistImage(spotifyWebApi, playlistId, playlistImageURL){
    toDataURL(playlistImageURL).then((dataURL) => {
        spotifyWebApi.uploadCustomPlaylistCoverImage(playlistId, dataURL)
            .catch((err) => {
                console.error(err);
            });
    });
}
