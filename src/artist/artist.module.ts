import { forwardRef, Module } from '@nestjs/common';
import { FavsModule } from 'src/favs/favs.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TrackModule } from 'src/track/track.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [TrackModule, forwardRef(() => FavsModule), PrismaModule],
  exports: [ArtistService],
})
export class ArtistModule {}
