import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './model/track.model';
import { v4 as uuidv4 } from 'uuid';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class TrackService {
  tracksMock: Track[] = [];

  constructor(private readonly favsService: FavsService) {}

  async getAllTracks() {
    return this.tracksMock;
  }

  async getTrackById(id: string) {
    return this.tracksMock.find((track: Track) => track.id === id);
  }

  async createTrack(dto: CreateTrackDto) {
    const newTrack: Track = {
      id: uuidv4(),
      ...dto,
    };
    this.tracksMock.push({ ...newTrack });
    return newTrack;
  }

  async updateTrack(id: string, dto: CreateTrackDto) {
    const updatedTrack = {
      id,
      ...dto,
    };
    this.tracksMock = this.tracksMock.map((track: Track) =>
      track.id === id ? { ...updatedTrack } : track,
    );
    return updatedTrack;
  }

  async deleteTrack(id: string) {
    this.tracksMock = this.tracksMock.filter((track: Track) => track.id !== id);
    this.favsService.deleteTrackFromFavs(id);
  }

  async artistWasDeleted(id: string) {
    this.tracksMock = this.tracksMock.map((track: Track) =>
      track.artistId === id ? { ...track, artistId: null } : track,
    );
  }

  async albumWasDeleted(id: string) {
    this.tracksMock = this.tracksMock.map((track: Track) =>
      track.albumId === id ? { ...track, albumId: null } : track,
    );
  }
}
