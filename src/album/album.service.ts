import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Album } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AlbumService {
  constructor(private readonly dbService: DbService) {}

  getAllAlbums(): Album[] {
    return this.dbService.albums;
  }

  getAlbumById(id: string): Album {
    const album = this.dbService.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  createAlbum(name: string, year: number, artistId: string): Album {
    if (!name || !year || !artistId) {
      throw new BadRequestException('Missing required fields');
    }
    const newAlbum = { id: uuidv4(), name, year, artistId };
    this.dbService.albums.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, name: string, year: number, artistId: string): Album {
    const albumIndex = this.dbService.albums.findIndex(
      (album) => album.id === id,
    );
    if (albumIndex === -1) {
      throw new NotFoundException('Album not found');
    }

    const updatedAlbum = { id, name, year, artistId };
    this.dbService.albums[albumIndex] = updatedAlbum;
    return updatedAlbum;
  }

  deleteAlbum(id: string): void {
    const albumIndex = this.dbService.albums.findIndex(
      (album) => album.id === id,
    );
    if (albumIndex === -1) {
      throw new NotFoundException('Album not found');
    }
    this.dbService.albums.splice(albumIndex, 1);
  }
}
