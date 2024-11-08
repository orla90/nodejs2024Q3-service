import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Album } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  getAllAlbums(): Album[] {
    return this.albums;
  }

  getAlbumById(id: string): Album {
    const album = this.albums.find((album) => album.id === id);
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
    this.albums.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, name: string, year: number, artistId: string): Album {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException('Album not found');
    }

    const updatedAlbum = { id, name, year, artistId };
    this.albums[albumIndex] = updatedAlbum;
    return updatedAlbum;
  }

  deleteAlbum(id: string): void {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException('Album not found');
    }
    this.albums.splice(albumIndex, 1);
  }
}
