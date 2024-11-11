import { IsString, IsInt, IsUUID } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsUUID()
  artistId: string;
}
