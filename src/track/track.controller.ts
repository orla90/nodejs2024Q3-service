import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { TrackService } from './track.service';
import { isUUID } from 'class-validator';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  findAll(): Track[] {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Track {
    return this.trackService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrackDto: CreateTrackDto): Track {
    if (
      (createTrackDto.albumId && !isUUID(createTrackDto.albumId)) ||
      (createTrackDto.artistId && !isUUID(createTrackDto.artistId)) ||
      !createTrackDto.duration ||
      !createTrackDto.name ||
      (createTrackDto.duration &&
        typeof createTrackDto.duration !== 'number') ||
      (createTrackDto.name && typeof createTrackDto.name !== 'string')
    ) {
      throw new BadRequestException();
    }
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Track {
    if (
      (updateTrackDto.albumId && !isUUID(updateTrackDto.albumId)) ||
      (updateTrackDto.artistId && !isUUID(updateTrackDto.artistId)) ||
      !updateTrackDto.duration ||
      !updateTrackDto.name ||
      (updateTrackDto.duration &&
        typeof updateTrackDto.duration !== 'number') ||
      (updateTrackDto.name && typeof updateTrackDto.name !== 'string')
    ) {
      throw new BadRequestException();
    }
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): void {
    this.trackService.remove(id);
  }
}
