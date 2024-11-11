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
import { AlbumService } from './album.service';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { isUUID } from 'class-validator';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll(): Album[] {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Album {
    return this.albumService.findOne(id);
  }

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto): Album {
    if (
      (createAlbumDto.artistId && !isUUID(createAlbumDto.artistId)) ||
      !createAlbumDto.year ||
      !createAlbumDto.name ||
      (createAlbumDto.year && typeof createAlbumDto.year !== 'number') ||
      (createAlbumDto.name && typeof createAlbumDto.name !== 'string')
    ) {
      throw new BadRequestException();
    }
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Album {
    if (
      (updateAlbumDto.artistId && !isUUID(updateAlbumDto.artistId)) ||
      !updateAlbumDto.year ||
      !updateAlbumDto.name ||
      (updateAlbumDto.year && typeof updateAlbumDto.year !== 'number') ||
      (updateAlbumDto.name && typeof updateAlbumDto.name !== 'string')
    ) {
      throw new BadRequestException();
    }
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe()) id: string): void {
    this.albumService.delete(id);
  }
}
