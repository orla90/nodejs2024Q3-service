import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from 'src/db/db.service';

@Injectable()
export class TrackService {
  constructor(private readonly dbService: DbService) {}

  create(createTrackDto: CreateTrackDto): Track {
    const track: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    this.dbService.tracks.push(track);
    return track;
  }

  findAll(): Track[] {
    return this.dbService.tracks;
  }

  findOne(id: string): Track {
    const track = this.dbService.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this.findOne(id);
    // track.name = updateTrackDto.name || track.name;
    // track.artistId = updateTrackDto.artistId || track.artistId;
    // track.albumId = updateTrackDto.albumId || track.albumId;
    // track.duration = updateTrackDto.duration || track.duration;
    Object.assign(track, updateTrackDto);
    return track;
  }

  remove(id: string): void {
    const index = this.dbService.tracks.findIndex((track) => track.id === id);
    if (index === -1) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    this.dbService.tracks.splice(index, 1);
  }
}
