import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { validate as uuidValidate } from 'uuid';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param('id', IdValidationPipe) id: string) {
    const album = await this.albumService.getAlbumById(id);
    if (!album) {
      throw new HttpException('error: no such album', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  @Post()
  async createAlbum(@Body() dto: CreateAlbumDto) {
    const { artistId } = dto;
    if (artistId && !uuidValidate(artistId)) {
      throw new HttpException(
        'error: artist id not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.albumService.createAlbum(dto);
  }

  @Put(':id')
  async updateAlbum(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreateAlbumDto,
  ) {
    const { artistId } = dto;
    if (artistId && !uuidValidate(artistId)) {
      throw new HttpException(
        'error: artist id not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const album = await this.albumService.getAlbumById(id);
    if (!album) {
      throw new HttpException('error: no such album', HttpStatus.NOT_FOUND);
    }
    return this.albumService.updateAlbum(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteAlbum(@Param('id', IdValidationPipe) id: string) {
    const album = await this.albumService.getAlbumById(id);
    if (!album) {
      throw new HttpException('error: no such album', HttpStatus.NOT_FOUND);
    }
    return this.albumService.deleteAlbum(id);
  }
}
