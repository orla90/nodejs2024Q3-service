import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoriteAlbumDto } from './dto/favorite-album.dto';
import { FavoriteArtistDto } from './dto/favorite-artist.dto';
import { FavoriteTrackDto } from './dto/favorite-track.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  addTrackToFavorites(@Param('id') id: string, @Body() body: FavoriteTrackDto) {
    body.trackId = id;
    this.favoritesService.addTrackToFavorites(body);
    return { message: 'Track added to favorites' };
  }

  @Delete('track/:id')
  removeTrackFromFavorites(
    @Param('id') id: string,
    @Body() body: FavoriteTrackDto,
  ) {
    body.trackId = id;
    this.favoritesService.removeTrackFromFavorites(body);
    return { message: 'Track removed from favorites' };
  }

  @Post('album/:id')
  addAlbumToFavorites(@Param('id') id: string, @Body() body: FavoriteAlbumDto) {
    body.albumId = id;
    this.favoritesService.addAlbumToFavorites(body);
    return { message: 'Album added to favorites' };
  }

  @Delete('album/:id')
  removeAlbumFromFavorites(
    @Param('id') id: string,
    @Body() body: FavoriteAlbumDto,
  ) {
    body.albumId = id;
    this.favoritesService.removeAlbumFromFavorites(body);
    return { message: 'Album removed from favorites' };
  }

  @Post('artist/:id')
  addArtistToFavorites(
    @Param('id') id: string,
    @Body() body: FavoriteArtistDto,
  ) {
    body.artistId = id;
    this.favoritesService.addArtistToFavorites(body);
    return { message: 'Artist added to favorites' };
  }

  @Delete('artist/:id')
  removeArtistFromFavorites(
    @Param('id') id: string,
    @Body() body: FavoriteArtistDto,
  ) {
    body.artistId = id;
    this.favoritesService.removeArtistFromFavorites(body);
    return { message: 'Artist removed from favorites' };
  }
}
