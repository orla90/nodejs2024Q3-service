import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from './entities/album.entity';
import { DbService } from 'src/db/db.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly dbService: DbService) {}

  findAll(): Album[] {
    return this.dbService.albums;
  }

  findOne(id: string): Album {
    const album = this.dbService.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum = new Album(createAlbumDto);
    this.dbService.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, updateAlbumDto: CreateAlbumDto): Album {
    const updatedAlbum = this.findOne(id);
    Object.assign(updatedAlbum, updateAlbumDto);
    return updatedAlbum;
  }

  delete(id: string): void {
    const albumIndex = this.dbService.albums.findIndex(
      (album) => album.id === id,
    );
    if (albumIndex === -1) {
      throw new NotFoundException('Album not found');
    }
    this.dbService.albums.splice(albumIndex, 1);
    this.removeReferences(id);
  }

  removeReferences(id: string) {
    this.dbService.tracks = this.dbService.tracks.map((track) =>
      track.albumId === id ? { ...track, albumId: null } : track,
    );

    if (this.dbService.favorites.albums.has(id)) {
      this.dbService.favorites.albums.delete(id);
    }
  }
}
