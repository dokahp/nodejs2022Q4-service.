import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './model/artist.model';
import { v4 as uuidv4 } from 'uuid';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class ArtistService {
  artistsMock: Artist[] = [];
  constructor(private readonly trackService: TrackService) {}
  async getAllArtists() {
    return this.artistsMock;
  }

  async getArtistById(id: string) {
    return this.artistsMock.find((artist: Artist) => artist.id === id);
  }

  async createArtist(dto: CreateArtistDto) {
    const { name, grammy } = dto;
    const newArtist: Artist = {
      id: uuidv4(),
      name,
      grammy,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.artistsMock.push(newArtist);
    return newArtist;
  }

  async updateArtist(id: string, dto: CreateArtistDto) {
    const { name, grammy } = dto;
    const updatedArtist = {
      id,
      name,
      grammy,
      updatedAt: Date.now(),
    };
    this.artistsMock = this.artistsMock.map((artist: Artist) =>
      artist.id === id
        ? { ...updatedArtist, createdAt: artist.createdAt }
        : artist,
    );
    return updatedArtist;
  }

  async deleteArtist(id: string) {
    this.artistsMock = this.artistsMock.filter(
      (artist: Artist) => artist.id !== id,
    );
    this.trackService.artistWasDeleted(id);
  }
}
