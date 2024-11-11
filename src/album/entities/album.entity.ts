import { randomUUID } from 'crypto';
import { CreateAlbumDto } from '../dto/create-album.dto';

export class Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor({ name, year, artistId }: CreateAlbumDto) {
    this.id = randomUUID();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}
