import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbService } from './db/db.service';
import { ArtistService } from './artist/artist.service';
import { ArtistModule } from './artist/artist.module';
import { TrackService } from './track/track.service';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { FavoritesService } from './favorites/favorites.service';
import { AlbumService } from './album/album.service';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DbService,
    ArtistService,
    TrackService,
    AlbumService,
    FavoritesService,
  ],
})
export class AppModule {}
