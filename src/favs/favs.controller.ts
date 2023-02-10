import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { TrackService } from 'src/track/track.service';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  @Get()
  async getAllFavs() {
    return this.favsService.getAllFavs();
  }

  @Post('track/:id')
  async addTrackToFavs(@Param('id', IdValidationPipe) id: string) {
    const track = await this.trackService.getTrackById(id);
    if (!track) {
      throw new HttpException(
        'error: no such track',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return this.favsService.addTrackToFavs(track);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  async deleteTrackFromFavs(@Param('id', IdValidationPipe) id: string) {
    const trackInFavs = this.favsService.findTrackInFavs(id);
    if (!trackInFavs) {
      throw new HttpException(
        'error: no such track in favorites',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.favsService.deleteTrackFromFavs(id);
  }

  @Post('album/:id')
  async addAlbumToFavs(@Param('id', IdValidationPipe) id: string) {
    const album = await this.albumService.getAlbumById(id);
    if (!album) {
      throw new HttpException(
        'error: no such album',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return this.favsService.addAlbumToFavs(album);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  async deleteAlbumFromFavs(@Param('id', IdValidationPipe) id: string) {
    const albumInFavs = this.favsService.findAlbumInFavs(id);
    if (!albumInFavs) {
      throw new HttpException(
        'error: no such album in favorites',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.favsService.deleteAlbumFromFavs(id);
  }

  @Post('artist/:id')
  async addArtistToFavs(@Param('id', IdValidationPipe) id: string) {
    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      throw new HttpException(
        'error: no such artist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return this.favsService.addArtistToFavs(artist);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  async deleteArtistFromFavs(@Param('id', IdValidationPipe) id: string) {
    const artistInFavs = this.favsService.findArtistInFavs(id);
    if (!artistInFavs) {
      throw new HttpException(
        'error: no such artist in favorites',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.favsService.deleteArtistFromFavs(id);
  }
}
