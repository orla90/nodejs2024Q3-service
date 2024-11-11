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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findAll(): Artist[] {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Artist {
    return this.artistService.findOne(id);
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): Artist {
    if (
      !createArtistDto.grammy ||
      !createArtistDto.name ||
      (createArtistDto.grammy && typeof createArtistDto.grammy !== 'boolean') ||
      (createArtistDto.name && typeof createArtistDto.name !== 'string')
    ) {
      throw new BadRequestException();
    }
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Artist {
    if (
      !updateArtistDto.name ||
      ((updateArtistDto.grammy || !updateArtistDto.grammy) &&
        typeof updateArtistDto.grammy !== 'boolean') ||
      (updateArtistDto.name && typeof updateArtistDto.name !== 'string')
    ) {
      throw new BadRequestException();
    }
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): void {
    this.artistService.remove(id);
  }
}
