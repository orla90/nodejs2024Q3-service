import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly dbService: DbService) {}

  getAllFavorites() {
    return {
      artists: this.dbService.artists.filter((artist) =>
        this.dbService.favorites.artists.has(artist.id),
      ),
      albums: this.dbService.albums.filter((album) =>
        this.dbService.favorites.albums.has(album.id),
      ),
      tracks: this.dbService.tracks.filter((track) =>
        this.dbService.favorites.tracks.has(track.id),
      ),
    };
  }

  addTrackToFavorites(id: string): void {
    if (!this.dbService.tracks.find((track) => track.id === id)) {
      throw new UnprocessableEntityException();
    }

    this.dbService.favorites.tracks.add(id);
  }

  removeTrackFromFavorites(id: string): void {
    if (!this.dbService.favorites.tracks.has(id)) {
      throw new NotFoundException();
    }

    this.dbService.favorites.tracks.delete(id);
  }

  addAlbumToFavorites(id: string): void {
    if (!this.dbService.albums.find((album) => album.id === id)) {
      throw new UnprocessableEntityException();
    }
    this.dbService.favorites.albums.add(id);
  }

  removeAlbumFromFavorites(id: string): void {
    if (!this.dbService.favorites.albums.has(id)) {
      throw new NotFoundException();
    }

    this.dbService.favorites.albums.delete(id);
  }

  addArtistToFavorites(id: string): void {
    if (!this.dbService.artists.find((artist) => artist.id === id)) {
      throw new UnprocessableEntityException();
    }

    this.dbService.favorites.artists.add(id);
  }

  removeArtistFromFavorites(id: string): void {
    if (!this.dbService.favorites.artists.has(id)) {
      throw new NotFoundException();
    }

    this.dbService.favorites.artists.delete(id);
  }
}
