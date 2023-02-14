import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FavsModule } from 'src/favs/favs.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [TrackService],
  controllers: [TrackController],
  exports: [TrackService],
  imports: [forwardRef(() => FavsModule), PrismaModule],
})
export class TrackModule {}
