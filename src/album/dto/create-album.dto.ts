import { IsString, IsInt, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsUUID()
  artistId: string;
}
