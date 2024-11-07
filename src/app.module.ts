import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbService } from './db/db.service';
import { ArtistService } from './artist/artist.service';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [UserModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService, DbService, ArtistService],
})
export class AppModule {}
