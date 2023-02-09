import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './model/artist.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  artistsMock: Artist[] = [];

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
      artist.id === id ? { ...artist, ...updatedArtist } : artist,
    );
    return updatedArtist;
  }

  async deleteArtist(id: string) {
    this.artistsMock = this.artistsMock.filter(
      (artist: Artist) => artist.id !== id,
    );
  }
}
