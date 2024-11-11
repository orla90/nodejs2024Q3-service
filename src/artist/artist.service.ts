import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from 'src/db/db.service';

@Injectable()
export class ArtistService {
  constructor(private readonly dbService: DbService) {}

  create(createArtistDto: CreateArtistDto): Artist {
    const artist: Artist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    this.dbService.artists.push(artist);
    return artist;
  }

  findAll(): Artist[] {
    return this.dbService.artists;
  }

  findOne(id: string): Artist {
    const artist = this.dbService.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = this.findOne(id);
    if (!artist) throw new NotFoundException('Artist not found');
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    return artist;
  }

  remove(id: string): void {
    const index = this.dbService.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (index === -1) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    this.dbService.artists.splice(index, 1);
    this.removeReferences(id);
  }

  private removeReferences(id: string) {
    this.dbService.tracks = this.dbService.tracks.map((track) =>
      track.artistId === id ? { ...track, artistId: null } : track,
    );

    this.dbService.albums = this.dbService.albums.map((album) =>
      album.artistId === id ? { ...album, artistId: null } : album,
    );

    if (this.dbService.favorites.artists.has(id)) {
      this.dbService.favorites.artists.delete(id);
    }
  }
}
