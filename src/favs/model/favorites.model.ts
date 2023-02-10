import { Album } from 'src/album/model/album.model';
import { Artist } from 'src/artist/model/artist.model';
import { Track } from 'src/track/model/track.model';

export class Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
