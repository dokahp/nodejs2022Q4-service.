import { forwardRef, Module } from '@nestjs/common';
import { FavsModule } from 'src/favs/favs.module';
import { TrackModule } from 'src/track/track.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [TrackModule, forwardRef(() => FavsModule)],
  exports: [ArtistService],
})
export class ArtistModule {}
