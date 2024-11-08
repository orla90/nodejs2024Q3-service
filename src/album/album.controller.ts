import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAllAlbums(): Album[] {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  getAlbumById(@Param('id') id: string): Album {
    return this.albumService.getAlbumById(id);
  }

  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto): Album {
    const { name, year, artistId } = createAlbumDto;
    return this.albumService.createAlbum(name, year, artistId);
  }

  @Put(':id')
  updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Album {
    const { name, year, artistId } = updateAlbumDto;
    return this.albumService.updateAlbum(id, name, year, artistId);
  }

  @Delete(':id')
  deleteAlbum(@Param('id') id: string): void {
    this.albumService.deleteAlbum(id);
  }
}
