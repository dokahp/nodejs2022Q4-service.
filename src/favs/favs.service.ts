import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/model/album.model';
import { Artist } from 'src/artist/model/artist.model';
import { Track } from 'src/track/model/track.model';
import { Favorites } from './model/favorites.model';

@Injectable()
export class FavsService {
  favsMock: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async getAllFavs() {
    return this.favsMock;
  }

  async addTrackToFavs(track: Track) {
    this.favsMock.tracks.push(track);
    return track;
  }

  async findTrackInFavs(id: string) {
    return this.favsMock.tracks.find((track: Track) => track.id === id);
  }

  async deleteTrackFromFavs(id: string) {
    this.favsMock.tracks = this.favsMock.tracks.filter(
      (track: Track) => track.id !== id,
    );
  }

  async addAlbumToFavs(album: Album) {
    this.favsMock.albums.push(album);
  }

  async findAlbumInFavs(id: string) {
    return this.favsMock.albums.find((album: Album) => album.id === id);
  }

  async deleteAlbumFromFavs(id: string) {
    this.favsMock.albums = this.favsMock.albums.filter(
      (album: Album) => album.id !== id,
    );
  }

  async addArtistToFavs(artist: Artist) {
    this.favsMock.artists.push(artist);
  }

  async findArtistInFavs(id: string) {
    return this.favsMock.artists.find((artist: Artist) => artist.id === id);
  }

  async deleteArtistFromFavs(id: string) {
    this.favsMock.artists = this.favsMock.artists.filter(
      (artist: Artist) => artist.id !== id,
    );
  }
}
