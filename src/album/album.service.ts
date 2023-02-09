import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './model/album.model';
import { v4 as uuidv4 } from 'uuid';
import { TrackService } from 'src/track/track.service';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class AlbumService {
  albumMock: Album[] = [];

  constructor(
    private readonly trackService: TrackService,
    private readonly favsService: FavsService,
  ) {}

  async getAllAlbums() {
    return this.albumMock;
  }

  async getAlbumById(id: string) {
    return this.albumMock.find((album: Album) => album.id === id);
  }

  async createAlbum(dto: CreateAlbumDto) {
    const { name, year, artistId } = dto;

    const newAlbum: Album = {
      id: uuidv4(),
      name,
      year,
      artistId,
    };
    this.albumMock.push({ ...newAlbum });
    return newAlbum;
  }

  async updateAlbum(id: string, dto: CreateAlbumDto) {
    const { name, year, artistId } = dto;
    const updatedAlbum = {
      id,
      name,
      year,
      artistId,
    };
    this.albumMock = this.albumMock.map((album: Album) =>
      album.id === id ? { ...updatedAlbum } : album,
    );
    return updatedAlbum;
  }

  async deleteAlbum(id: string) {
    this.albumMock = this.albumMock.filter((album: Album) => album.id !== id);
    this.trackService.albumWasDeleted(id);
    this.favsService.deleteAlbumFromFavs(id);
  }
}
