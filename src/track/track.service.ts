import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './model/track.model';

import { FavsService } from 'src/favs/favs.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly favsService: FavsService,
  ) {}

  async getAllTracks() {
    return await this.prisma.track.findMany();
  }

  async getTrackById(id: string) {
    return await this.prisma.track.findUnique({
      where: { id: id },
    });
  }

  async createTrack(dto: CreateTrackDto) {
    const { name, duration, albumId, artistId } = dto;
    return await this.prisma.track.create({
      data: {
        name,
        duration,
        albumId,
        artistId,
      },
    });
  }

  async updateTrack(id: string, dto: CreateTrackDto) {
    const { name, duration, albumId, artistId } = dto;
    return await this.prisma.track.update({
      where: { id: id },
      data: {
        name,
        duration,
        albumId,
        artistId,
      },
    });
  }

  async deleteTrack(id: string) {
    await this.prisma.track.delete({
      where: { id: id },
    });
    this.favsService.deleteTrackFromFavs(id);
  }

  // async artistWasDeleted(id: string) {
  //   this.tracksMock = this.tracksMock.map((track: Track) =>
  //     track.artistId === id ? { ...track, artistId: null } : track,
  //   );
  // }

  // async albumWasDeleted(id: string) {
  //   this.tracksMock = this.tracksMock.map((track: Track) =>
  //     track.albumId === id ? { ...track, albumId: null } : track,
  //   );
  // }
}
