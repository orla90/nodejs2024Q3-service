import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DbService {
  users: User[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  favorites = {
    artists: new Set(),
    albums: new Set(),
    tracks: new Set(),
  };
}
