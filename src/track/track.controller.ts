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
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';
import { validate as uuidValidate } from 'uuid';
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  async getTrackById(@Param('id', IdValidationPipe) id: string) {
    const track = await this.trackService.getTrackById(id);
    if (!track) {
      throw new HttpException('error: no such track', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  @Post()
  async createTrack(@Body() dto: CreateTrackDto) {
    const { albumId, artistId } = dto;
    if (
      (albumId && !uuidValidate(albumId)) ||
      (artistId && !uuidValidate(artistId))
    ) {
      throw new HttpException(
        'error: albumId or artistId not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.trackService.createTrack(dto);
  }

  @Put(':id')
  async updateTrack(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreateTrackDto,
  ) {
    const { albumId, artistId } = dto;
    if (
      (albumId && !uuidValidate(albumId)) ||
      (artistId && !uuidValidate(artistId))
    ) {
      throw new HttpException(
        'error: albumId or artistId not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const track = await this.getTrackById(id);
    if (!track) {
      throw new HttpException('error: no such track', HttpStatus.NOT_FOUND);
    }
    return this.trackService.updateTrack(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteTrack(@Param('id', IdValidationPipe) id: string) {
    const track = await this.getTrackById(id);
    if (!track) {
      throw new HttpException('error: no such track', HttpStatus.NOT_FOUND);
    }
    this.trackService.deleteTrack(id);
  }
}
