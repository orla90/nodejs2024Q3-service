import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { DbService } from 'src/db/db.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, DbService],
})
export class FavoritesModule {}
