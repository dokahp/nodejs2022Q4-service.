import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { TrackService } from 'src/track/track.service';
import { FavsService } from 'src/favs/favs.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly trackService: TrackService,
    private readonly favsService: FavsService,
  ) {}

  async getAllAlbums() {
    return await this.prisma.album.findMany();
  }

  async getAlbumById(id: string) {
    return this.prisma.album.findUnique({
      where: { id: id },
    });
  }

  async createAlbum(dto: CreateAlbumDto) {
    const { name, year, artistId } = dto;
    return await this.prisma.album.create({
      data: {
        name,
        year,
        artistId,
      },
    });
  }

  async updateAlbum(id: string, dto: CreateAlbumDto) {
    const { name, year, artistId } = dto;
    return await this.prisma.album.update({
      where: { id: id },
      data: {
        name,
        year,
        artistId,
      },
    });
  }

  async deleteAlbum(id: string) {
    await this.prisma.album.delete({
      where: { id: id },
    });
    // this.trackService.albumWasDeleted(id);
    // this.favsService.deleteAlbumFromFavs(id);
  }
}
