import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { TrackService } from 'src/track/track.service';
import { FavsService } from 'src/favs/favs.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly trackService: TrackService,
    private readonly favsService: FavsService,
  ) {}
  async getAllArtists() {
    return this.prisma.artist.findMany();
  }

  async getArtistById(id: string) {
    return this.prisma.artist.findUnique({
      where: { id: id },
    });
  }

  async createArtist(dto: CreateArtistDto) {
    const { name, grammy } = dto;
    return await this.prisma.artist.create({
      data: {
        name,
        grammy,
      },
    });
  }

  async updateArtist(id: string, dto: CreateArtistDto) {
    const { name, grammy } = dto;
    return await this.prisma.artist.update({
      where: { id: id },
      data: {
        name,
        grammy,
      },
    });
  }

  async deleteArtist(id: string) {
    await this.prisma.artist.delete({
      where: { id: id },
    });
    this.trackService.artistWasDeleted(id);
    this.favsService.deleteArtistFromFavs(id);
  }
}
