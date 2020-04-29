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


/**
 * The spotify API only allows 100 songs to be added to a playlist in one request
 * This splits an array of 100+ tracks to be added to a playlist into separate arrays of 100 tracks
 * so songs can be added to the same playlist iteratively
 */
export function meet100TrackLimit(overLimit) {
    var result = overLimit.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 100)

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item)

        return resultArray
    }, [])
    return result;
}