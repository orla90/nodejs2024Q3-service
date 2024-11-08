import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbService } from './db/db.service';
import { ArtistService } from './artist/artist.service';
import { ArtistModule } from './artist/artist.module';
import { TrackService } from './track/track.service';
import { TrackController } from './track/track.controller';
import { TrackModule } from './track/track.module';

@Module({
  imports: [UserModule, ArtistModule, TrackModule],
  controllers: [AppController, TrackController],
  providers: [AppService, DbService, ArtistService, TrackService],
})
export class AppModule {}
