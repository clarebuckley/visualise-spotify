import { toDataURL } from './Base64ImageHelper.js';

//Uploads a custom cover image to the given playlist
export function uploadPlaylistImage(
    spotifyWebApi,
    playlistId,
    playlistImageURL
) {
    toDataURL(playlistImageURL).then((dataURL) => {
        spotifyWebApi
            .uploadCustomPlaylistCoverImage(playlistId, dataURL)
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
        const chunkIndex = Math.floor(index / 100);

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
    }, []);
    return result;
}

//Get x number of top tracks for a given array of artists
export function getTopTracksForArtists(artists, numOfTracks, spotifyWebApi) {
    return new Promise((resolve) => {
        var promises = [];
        for (let artist of artists) {
            promises.push(
                getArtistTracks(artist.id, numOfTracks, spotifyWebApi)
            );
        }
        Promise.all(promises).then((topTracks) => {
            return resolve(topTracks);
        });
    });
}

//Get the top tracks for a single artist
async function getArtistTracks(artistId, numOfTracks, spotifyWebApi) {
    return new Promise((resolve) => {
        //TODO: need to get rid of "GB" string
        spotifyWebApi
            .getArtistTopTracks(artistId, 'GB')
            .then((response) => {
                if (numOfTracks === 1) {
                    return resolve(response.tracks[0]);
                } else {
                    return resolve(response.tracks.slice(0, numOfTracks));
                }
            })
            .catch((err) => {
                console.error(err);
            });
    });
}
