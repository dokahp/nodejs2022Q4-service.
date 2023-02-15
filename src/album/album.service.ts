import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { FavsService } from 'src/favs/favs.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavouritesTypes } from 'src/favs/model/favorites.model';

@Injectable()
export class AlbumService {
  constructor(
    private readonly prisma: PrismaService,
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
    this.favsService.deleteFromFavs(FavouritesTypes.albums, id);
  }
}
