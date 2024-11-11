import { IsUUID } from 'class-validator';

export class FavoriteArtistDto {
  @IsUUID()
  artistId: string;
}
