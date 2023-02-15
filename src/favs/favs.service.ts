import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Favorites, FavouritesTypes } from './model/favorites.model';

@Injectable()
export class FavsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllFavs() {
    const arrFavs: Favorites = await this.prisma.favourites.findFirst({
      include: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });
    if (!arrFavs) {
      return {
        artists: [],
        tracks: [],
        albums: [],
      };
    }
    return arrFavs;
  }

  async addToFavs(type: FavouritesTypes, typeId: string) {
    const checkRecord = await this.prisma.favourites.findFirst({});
    if (!checkRecord) {
      await this.prisma.favourites.create({ data: {} });
    }
    const record = await this.prisma.favourites.findFirst({});
    return await this.prisma.favourites.update({
      where: { id: record.id },
      data: {
        [type]: {
          connect: {
            id: typeId,
          },
        },
      },
      include: {
        tracks: true,
        albums: true,
        artists: true,
      },
    });
  }

  async findInFavs(type: FavouritesTypes, id: string) {
    return await this.prisma.favourites.findMany({
      where: {
        [type]: {
          some: {
            id,
          },
        },
      },
    });
  }

  async deleteFromFavs(type: FavouritesTypes, id: string) {
    await this.prisma.favourites.deleteMany({
      where: {
        [type]: {
          some: {
            id,
          },
        },
      },
    });
  }
}
