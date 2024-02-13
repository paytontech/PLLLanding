// interface PlaylistSong {
//     title: string,
//     artist: string,
//     artworkURL?: string,
//     songID: string,
//     colorHex?: string
// }

export class PlaylistSong {
    title: string
    artist: string
    artworkURL?: string
    songID: string
    colorHex?: string

    constructor(title: string, artist: string, songID: string, artworkURL?: string,  colorHex?: string) {
        this.title = title
        this.artist = artist
        this.artworkURL = artworkURL
        this.songID = songID
        this.colorHex = colorHex
    }
}
