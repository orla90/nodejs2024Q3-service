import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Favorites, FavoritesResponse } from './entities/favorites.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { FavoriteAlbumDto } from './dto/favorite-album.dto';
import { FavoriteArtistDto } from './dto/favorite-artist.dto';
import { FavoriteTrackDto } from './dto/favorite-track.dto';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  private artists: Artist[] = [];
  private albums: Album[] = [];
  private tracks: Track[] = [];

  private entityExists(collection: any[], id: string): boolean {
    return collection.some((item) => item.id === id);
  }

  addTrackToFavorites(trackDto: FavoriteTrackDto): void {
    const { trackId } = trackDto;
    if (!this.entityExists(this.tracks, trackId)) {
      throw new NotFoundException('Track not found');
    }

    if (this.favorites.tracks.includes(trackId)) {
      throw new BadRequestException('Track already in favorites');
    }

    this.favorites.tracks.push(trackId);
  }

  removeTrackFromFavorites(trackDto: FavoriteTrackDto): void {
    const { trackId } = trackDto;
    const index = this.favorites.tracks.indexOf(trackId);
    if (index === -1) {
      throw new NotFoundException('Track not in favorites');
    }

    this.favorites.tracks.splice(index, 1);
  }

  addAlbumToFavorites(albumDto: FavoriteAlbumDto): void {
    const { albumId } = albumDto;
    if (!this.entityExists(this.albums, albumId)) {
      throw new NotFoundException('Album not found');
    }

    if (this.favorites.albums.includes(albumId)) {
      throw new BadRequestException('Album already in favorites');
    }

    this.favorites.albums.push(albumId);
  }

  removeAlbumFromFavorites(albumDto: FavoriteAlbumDto): void {
    const { albumId } = albumDto;
    const index = this.favorites.albums.indexOf(albumId);
    if (index === -1) {
      throw new NotFoundException('Album not in favorites');
    }

    this.favorites.albums.splice(index, 1);
  }

  addArtistToFavorites(artistDto: FavoriteArtistDto): void {
    const { artistId } = artistDto;
    if (!this.entityExists(this.artists, artistId)) {
      throw new NotFoundException('Artist not found');
    }

    if (this.favorites.artists.includes(artistId)) {
      throw new BadRequestException('Artist already in favorites');
    }

    this.favorites.artists.push(artistId);
  }

  removeArtistFromFavorites(artistDto: FavoriteArtistDto): void {
    const { artistId } = artistDto;
    const index = this.favorites.artists.indexOf(artistId);
    if (index === -1) {
      throw new NotFoundException('Artist not in favorites');
    }

    this.favorites.artists.splice(index, 1);
  }

  getAllFavorites(): FavoritesResponse {
    const favoriteArtists = this.artists.filter((artist) =>
      this.favorites.artists.includes(artist.id),
    );
    const favoriteAlbums = this.albums.filter((album) =>
      this.favorites.albums.includes(album.id),
    );
    const favoriteTracks = this.tracks.filter((track) =>
      this.favorites.tracks.includes(track.id),
    );

    return {
      artists: favoriteArtists,
      albums: favoriteAlbums,
      tracks: favoriteTracks,
    };
  }
}
