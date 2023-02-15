import { forwardRef, Module } from '@nestjs/common';
import { FavsModule } from 'src/favs/favs.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TrackModule } from 'src/track/track.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [TrackModule, forwardRef(() => FavsModule), PrismaModule],
  exports: [AlbumService],
})
export class AlbumModule {}
