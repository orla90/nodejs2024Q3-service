import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  findAll(): Track[] {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Track {
    return this.trackService.findOne(id);
  }

  @Post()
  create(@Body() createTrackDto: CreateTrackDto): Track {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Track {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.trackService.remove(id);
  }
}
