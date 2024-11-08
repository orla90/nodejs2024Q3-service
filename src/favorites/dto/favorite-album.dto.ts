import { IsUUID } from 'class-validator';

export class FavoriteAlbumDto {
  @IsUUID()
  albumId: string;
}
