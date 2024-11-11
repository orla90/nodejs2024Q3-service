import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  addTrackToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeTrackFromFavorites(id);
  }

  @Post('album/:id')
  addAlbumToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  addArtistToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeArtistFromFavorites(id);
  }
}
