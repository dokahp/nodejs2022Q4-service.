import { Injectable } from '@nestjs/common';
import { Album } from './model/album.model';

@Injectable()
export class AlbumService {
  albumMock: Album[] = [];
}
