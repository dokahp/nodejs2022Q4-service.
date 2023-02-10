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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  async getArtistById(@Param('id', IdValidationPipe) id: string) {
    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      throw new HttpException('error: no such artist', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  @Post()
  async createArtist(@Body() dto: CreateArtistDto) {
    return this.artistService.createArtist(dto);
  }

  @Put(':id')
  async updateArtist(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreateArtistDto,
  ) {
    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      throw new HttpException('error: no such artist', HttpStatus.NOT_FOUND);
    }
    return this.artistService.updateArtist(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteArtist(@Param('id', IdValidationPipe) id: string) {
    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      throw new HttpException('error: no such artist', HttpStatus.NOT_FOUND);
    }
    this.artistService.deleteArtist(id);
  }
}
